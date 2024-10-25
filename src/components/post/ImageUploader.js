import { useRef } from "react";
import { FaImage } from "react-icons/fa";
import "@pqina/pintura/pintura.css";

export default function ImageUploader({ onFileSelect }) {
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors duration-300"
      onClick={() => fileInputRef.current.click()}
    >
      <FaImage className="mx-auto text-gray-400 text-4xl mb-4" />
      <p className="text-gray-500">Click to upload an image</p>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        ref={fileInputRef}
        className="hidden"
        aria-label="Upload Image"
      />
    </div>
  );
}
