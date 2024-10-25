"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import api from "@/utils/axiosInstance";
import ImageUploader from "./ImageUploader";
import ImageEditor from "./ImageEditor";
import PostEditor from "./PostEditor";
import SubmitButton from "./SubmitButton";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [editedImage, setEditedImage] = useState(null);
  const [showEditor, setShowEditor] = useState(false);

  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const handleImageChange = (file) => {
    if (file) {
      setImage(file);
      setShowEditor(true);
    }
  };

  const handleImageSave = (editedBlob) => {
    setEditedImage(editedBlob);
    setShowEditor(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (editedImage) {
        formData.append("image", editedImage, "edited-image.jpg");
      } else if (image) {
        formData.append("image", image);
      }

      const response = await api.post("posts/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        router.push("/posts");
      } else {
        console.error(
          `Failed to create post: Unexpected response status ${response.status}`
        );
      }
    } catch (err) {
      console.error("Failed to create post:", err);
    }
  };

  if (!isLoggedIn) {
    return <div>Please log in to create a post.</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-8">
        {!!image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Selected Image"
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
        )}
        <h2 className="card-title text-3xl font-extrabold mb-6">
          Create a Post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!showEditor && <ImageUploader onFileSelect={handleImageChange} />}
          {showEditor && (
            <ImageEditor
              image={image}
              onImageSave={handleImageSave}
              onCancel={() => setShowEditor(false)}
            />
          )}
          <PostEditor
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
          />
          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
