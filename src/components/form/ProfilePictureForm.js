import Image from "next/image";
import { useRef } from "react";
import { FaImage } from "react-icons/fa";

export function ProfilePictureForm({
  profileData,
  setProfileData,
  selectedProfileFile,
  setSelectedProfileFile,
  handleSubmit,
  handleCancel,
}) {
  const fileRef = useRef(null);
  return (
    <div className="flex-shrink-0">
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="profile_picture"
          className="flex flex-col items-center justify-center cursor-pointer relative"
        >
          <div className="absolute z-10 bg-black opacity-35 hover:opacity-70 w-32 h-32 rounded-full border-2 border-dashed border-gray-300 p-8 hover:border-primary transition-all duration-300">
            <FaImage className="mx-auto text-gray-400 text-4xl h-full" />
          </div>
          <Image
            className="mx-auto h-32 w-32 rounded-full border-4 border-base-100"
            src={profileData.profile_picture}
            alt={"Profile Picture"}
            width={128}
            height={128}
          />
        </label>

        {selectedProfileFile && (
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
        id="profile_picture"
        name="profile_picture"
        ref={fileRef}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            setSelectedProfileFile(file);
            setProfileData({
              ...profileData,
              profile_picture: URL.createObjectURL(file),
            });
          }
        }}
      />
    </div>
  );
}
