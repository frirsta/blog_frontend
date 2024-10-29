"use client";
import { useState, useEffect, useRef } from "react";
import DOMPurify from "dompurify";
import api from "@/utils/axiosInstance";
import PostEditor from "./PostEditor";
import WarningModal from "./WarningModal";
import ImageUpload from "./ImageUpload";
import ImageEditor from "./ImageEditor";

const CreatePost = ({ isOpen, closeModal }) => {
  const [step, setStep] = useState(1);
  const [imageSrc, setImageSrc] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});
  const [showWarning, setShowWarning] = useState(false);
  const [discardOrigin, setDiscardOrigin] = useState(null);

  const modalRef = useRef(null);

  // Close modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        if (step > 1) {
          setDiscardOrigin("outsideClick");
          setShowWarning(true);
        } else {
          closeModal();
        }
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, closeModal, step]);

  // Reset form after submission or discard
  const resetForm = () => {
    setStep(1);
    setImageSrc(null);
    setProcessedImage(null);
    setTitle("");
    setContent("");
  };

  // Handle back navigation and conditional warnings
  const handleBackStep = () => {
    if (step === 2) {
      setDiscardOrigin("backButton");
      setShowWarning(true);
    } else if (step === 1) {
      closeModal();
    } else {
      setStep(step - 1);
    }
  };

  // Confirmation and cancellation for discarding post edits
  const confirmDiscard = () => {
    setShowWarning(false);
    if (discardOrigin === "outsideClick") {
      closeModal();
    } else if (discardOrigin === "backButton") {
      resetForm();
    }
  };

  const cancelDiscard = () => setShowWarning(false);

  // Save post to backend
  const handleSavePost = async () => {
    const sanitizedContent = DOMPurify.sanitize(content);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", sanitizedContent);

      if (processedImage) {
        formData.append("image", processedImage);
      }

      const response = await api.post("posts/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) resetForm();
      else console.error("Failed to create post");
    } catch (error) {
      setErrors(error.response?.data || {});
      console.error("Error creating post:", error);
    }
  };

  return (
    isOpen && (
      <div className="modal opacity-100 pointer-events-auto">
        <div
          ref={modalRef}
          className="modal-box h-[600px] modal-middle py-8 rounded-lg drop-shadow-2xl"
        >
          <button
            onClick={handleBackStep}
            className="btn btn-circle btn-ghost absolute top-2 left-6 btn-xs"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Step 1: Upload Image */}
          {step === 1 && (
            <ImageUpload
              onImageSelect={setImageSrc}
              onNext={() => setStep(2)}
            />
          )}

          {/* Step 2: Edit Image */}
          <div className={`${step === 2 ? "block" : "hidden"} w-full h-full`}>
            <ImageEditor
              imageSrc={imageSrc}
              onNext={() => setStep(3)}
              onProcessImage={setProcessedImage}
            />
          </div>

          {/* Step 3: Edit Post Details */}
          {step === 3 && (
            <div className="w-full">
              <PostEditor
                title={title}
                setTitle={setTitle}
                content={content}
                setContent={setContent}
                error={errors}
                onSave={handleSavePost}
              />
            </div>
          )}
          {showWarning && (
            <WarningModal onCancel={cancelDiscard} onConfirm={confirmDiscard} />
          )}
        </div>
      </div>
    )
  );
};

export default CreatePost;
