import Image from "next/image";
import { FaImage } from "react-icons/fa";

export function PictureForm({
  pictureType,
  profileData,
  handleFileChange,
  fileRef,
  defaultPicture,
  label,
}) {
  return (
    <div
      className={pictureType === "cover" ? "relative h-80" : "flex-shrink-0"}
    >
      <label
        htmlFor={`${pictureType}_picture`}
        className="cursor-pointer relative flex flex-col items-center justify-center"
      >
        <div
          className={`absolute ${
            pictureType === "cover"
              ? "inset-0"
              : "z-10 w-32 h-32 rounded-full border-2 border-dashed border-gray-300 p-8"
          } bg-black opacity-35 hover:opacity-50 transition-all duration-300 flex items-center justify-center`}
        >
          <FaImage
            className={`${
              pictureType === "cover" ? "text-white" : "text-gray-400"
            } text-4xl`}
          />
        </div>
        <Image
          className={`${
            pictureType === "cover"
              ? "object-cover w-full h-[300px]"
              : "mx-auto h-32 w-32 rounded-full border-4 border-base-100"
          }`}
          src={profileData[`${pictureType}_picture`] || defaultPicture}
          alt={label}
          width={pictureType === "cover" ? 2000 : 128}
          height={pictureType === "cover" ? 2000 : 128}
          priority
        />
      </label>
      <input
        type="file"
        accept="image/*"
        id={`${pictureType}_picture`}
        name={`${pictureType}_picture`}
        ref={fileRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
