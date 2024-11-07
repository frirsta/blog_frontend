import React, { useRef } from "react";
import { FaImage } from "react-icons/fa";

const ImageUpload = ({ onImageSelect, onNext }) => {
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onImageSelect(URL.createObjectURL(file));
      onNext();
    }
  };

  return (
    <div
      className="m-auto flex flex-col w-full items-center justify-center border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-neutral transition-colors duration-300"
      onClick={() => fileInputRef.current.click()}
    >
      <FaImage className="mx-auto text-base-content/70 text-4xl mb-4" />
      <p className="text-base-content/70">Click to upload an image</p>
      <input
        id="post-image"
        name="post-image"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
        className="hidden"
        aria-label="Upload Image"
      />
    </div>
  );
};

export default ImageUpload;
