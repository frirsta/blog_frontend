import Image from "next/image";
import { FaImage } from "react-icons/fa";

export function PictureForm({
  pictureType,
  profileData,
  setProfileData,
  selectedFile,
  setSelectedFile,
  handleSubmit,
  handleCancel,
  fileRef,
  handleFileChange,
  defaultPicture,
  label,
}) {
  return (
    <div
      className={pictureType === "cover" ? "relative h-80" : "flex-shrink-0"}
    >
      <form onSubmit={handleSubmit}>
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
                ? "object-cover w-full h-full"
                : "mx-auto h-32 w-32 rounded-full border-4 border-base-100"
            }`}
            src={profileData[`${pictureType}_picture`] || defaultPicture}
            alt={label}
            width={pictureType === "cover" ? 2000 : 128}
            height={pictureType === "cover" ? 2000 : 128}
            priority
          />
        </label>

        {selectedFile && (
          <div className="flex justify-center space-x-2 mt-2">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
      <input
        type="file"
        accept="image/*"
        id={`${pictureType}_picture`}
        name={`${pictureType}_picture`}
        ref={fileRef}
        className="hidden"
        onChange={(e) =>
          handleFileChange(
            e,
            setSelectedFile,
            setProfileData,
            `${pictureType}_picture`
          )
        }
      />
    </div>
  );
}
