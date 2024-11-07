"use client";
import { useState, useEffect, useRef } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import DOMPurify from "dompurify";
import api from "@/utils/axiosInstance";
import PostEditor from "./PostEditor";
import WarningModal from "./WarningModal";
import ImageUpload from "./ImageUpload";
import ImageEditor from "./ImageEditor";
import Loading from "../ui/Loading";

const CreatePost = ({ isOpen, closeModal }) => {
  const [step, setStep] = useState(1);
  const [imageSrc, setImageSrc] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});
  const [showWarning, setShowWarning] = useState(false);
  const [discardOrigin, setDiscardOrigin] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

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

  const resetForm = () => {
    setStep(1);
    setImageSrc(null);
    setProcessedImage(null);
    setTitle("");
    setContent("");
    setSelectedCategory(null);
    setTags([]);
    setErrors({});
    closeModal();
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
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", sanitizedContent);

      tags.forEach((tag) => formData.append("tags_names", tag));

      if (processedImage) {
        formData.append("image", processedImage);
      }

      if (selectedCategory) {
        formData.append("category_id", selectedCategory);
      }

      const response = await api.post("posts/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) resetForm();
      else console.error("Failed to create post");
    } catch (error) {
      setErrors(error.response?.data);
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    isOpen && (
      <div className="modal opacity-100 pointer-events-auto">
        <div
          ref={modalRef}
          className="modal-box flex-col min-h-fit flex h-full modal-middle py-10 rounded-lg drop-shadow-2xl bg-base-200"
        >
          {loading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Loading message="Creating post..." />
            </div>
          ) : (
            <>
              <button
                onClick={handleBackStep}
                className="btn btn-sm btn-link absolute top-2 left-8 text-base-content z-10"
              >
                <FaArrowLeftLong className="w-5 h-5" />
              </button>
              <div className="divider m-0 w-full"></div>
              {/* Step 1: Upload Image */}
              {step === 1 && (
                <ImageUpload
                  onImageSelect={setImageSrc}
                  onNext={() => setStep(2)}
                />
              )}
              {/* Step 2: Edit Image */}
              <div
                className={`${step === 2 ? "block" : "hidden"} w-full h-full`}
              >
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
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    tags={tags}
                    setTags={setTags}
                  />
                </div>
              )}
            </>
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
