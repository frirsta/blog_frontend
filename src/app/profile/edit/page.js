"use client";
import { useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useMessage } from "@/context/MessageContext";
import { PictureForm } from "@/components/form/PictureForm";
import api from "@/utils/axiosInstance";

export default function page() {
  const { currentUser } = useAuth();
  const { showMessage } = useMessage();

  const [profileData, setProfileData] = useState({
    profile_picture: currentUser.profile_picture,
    cover_picture: currentUser.cover_picture,
  });
  const [selectedProfileFile, setSelectedProfileFile] = useState(null);
  const [selectedCoverFile, setSelectedCoverFile] = useState(null);

  const profileFileRef = useRef(null);
  const coverFileRef = useRef(null);

  const handleSubmit = async (e, pictureType) => {
    e.preventDefault();
    const formData = new FormData();
    if (pictureType === "profile" && selectedProfileFile) {
      formData.append("profile_picture", selectedProfileFile);
    } else if (pictureType === "cover" && selectedCoverFile) {
      formData.append("cover_picture", selectedCoverFile);
    }

    try {
      const response = await api.patch("profiles/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showMessage(
        "success",
        `${
          pictureType === "profile" ? "Profile" : "Cover"
        } picture updated successfully`
      );

      setProfileData((prevData) => ({
        ...prevData,
        [`${pictureType}_picture`]: response.data[`${pictureType}_picture`],
      }));

      if (pictureType === "profile") {
        setSelectedProfileFile(null);
      } else {
        setSelectedCoverFile(null);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.[`${pictureType}_picture`] ||
        `Failed to update ${pictureType} picture`;
      showMessage("error", errorMessage);
    }
  };

  const handleCancel = (pictureType, fileInputRef) => {
    if (pictureType === "profile") {
      setSelectedProfileFile(null);
      setProfileData((prevData) => ({
        ...prevData,
        profile_picture: currentUser.profile_picture,
      }));
    } else if (pictureType === "cover") {
      setSelectedCoverFile(null);
      setProfileData((prevData) => ({
        ...prevData,
        cover_picture: currentUser.cover_picture,
      }));
    }
    fileInputRef.current.value = "";
  };

  const handleFileChange = (e, setFile, setData, key) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setData((prevData) => ({
        ...prevData,
        [key]: URL.createObjectURL(file),
      }));
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <PictureForm
        pictureType="cover"
        profileData={profileData}
        setProfileData={setProfileData}
        selectedFile={selectedCoverFile}
        setSelectedFile={setSelectedCoverFile}
        handleSubmit={(e) => handleSubmit(e, "cover")}
        handleCancel={() => handleCancel("cover", coverFileRef)}
        fileRef={coverFileRef}
        handleFileChange={handleFileChange}
        defaultPicture="/cover_default.png"
        label="Cover Picture"
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative">
        <div className="bg-base-100 shadow-xl rounded-box p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <PictureForm
                pictureType="profile"
                profileData={profileData}
                setProfileData={setProfileData}
                selectedFile={selectedProfileFile}
                setSelectedFile={setSelectedProfileFile}
                handleSubmit={(e) => handleSubmit(e, "profile")}
                handleCancel={() => handleCancel("profile", profileFileRef)}
                fileRef={profileFileRef}
                handleFileChange={handleFileChange}
                defaultPicture="/default_profile.png"
                label="Profile Picture"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
