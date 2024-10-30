"use client";
import { useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useMessage } from "@/context/MessageContext";
import { ProfilePictureForm } from "@/components/form/ProfilePictureForm";
import CoverImage from "@/components/profile/CoverImage";
import api from "@/utils/axiosInstance";

export default function page() {
  const { currentUser } = useAuth();
  const { showMessage } = useMessage();
  const fileRef = useRef(null);
  const [profileData, setProfileData] = useState({
    profile_picture: currentUser.profile_picture,
    cover_picture: currentUser.cover_picture,
  });
  const [selectedProfileFile, setSelectedProfileFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (selectedProfileFile) {
      formData.append("profile_picture", selectedProfileFile);
    }

    try {
      await api.patch(`profiles/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showMessage("success", "Profile picture updated successfully");
      setProfileData({
        profile_picture: currentUser.profile_picture,
        cover_picture: currentUser.cover_picture,
      });
      setSelectedProfileFile(null);
    } catch (error) {
      const errorMessage =
        error.response?.data?.profile_picture ||
        "Failed to update profile picture";
      showMessage("error", errorMessage);
    }
  };

  const handleCancel = () => {
    setSelectedProfileFile(null);
    setProfileData({
      profile_picture: currentUser.profile_picture,
      cover_picture: currentUser.cover_picture,
    });
    fileRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-base-200">
      <CoverImage coverPicture={profileData.cover_picture} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative">
        <div className="bg-base-100 shadow-xl rounded-box p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <ProfilePictureForm
                profileData={profileData}
                setProfileData={setProfileData}
                selectedProfileFile={selectedProfileFile}
                setSelectedProfileFile={setSelectedProfileFile}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
