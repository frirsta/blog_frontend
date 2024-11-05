"use client";
import { useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useMessage } from "@/context/MessageContext";
import { PictureForm } from "@/components/form/PictureForm";
import { UserInfo } from "@/components/profile/UserInfo";
import ProfileDetailsForm from "@/components/form/ProfileDetailsForm";
import api from "@/utils/axiosInstance";

export default function EditProfilePage() {
  const { currentUser } = useAuth();
  const { showMessage } = useMessage();

  const [profileData, setProfileData] = useState({
    profile_picture: currentUser?.profile_picture,
    cover_picture: currentUser?.cover_picture,
    bio: currentUser?.bio || "",
    location: currentUser?.location || "",
    website: currentUser?.website || "",
    username: currentUser?.username || "",
  });
  const [selectedProfileFile, setSelectedProfileFile] = useState(null);
  const [selectedCoverFile, setSelectedCoverFile] = useState(null);

  const profileFileRef = useRef(null);
  const coverFileRef = useRef(null);

  const handleFileChange = async (e, setFile, setData, key, pictureType) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setData((prevData) => ({
        ...prevData,
        [key]: URL.createObjectURL(file),
      }));

      const formData = new FormData();
      formData.append(
        pictureType === "profile" ? "profile_picture" : "cover_picture",
        file
      );

      try {
        const response = await api.patch(
          `profiles/${currentUser?.id}/`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        showMessage(
          "success",
          `${
            pictureType === "profile" ? "Profile" : "Cover"
          } picture updated successfully`
        );

        setProfileData((prevData) => ({
          ...prevData,
          ...response.data,
        }));

        if (pictureType === "profile") {
          setSelectedProfileFile(null);
        } else if (pictureType === "cover") {
          setSelectedCoverFile(null);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.[`${pictureType}_picture`] ||
          "Failed to update profile";
        showMessage("error", errorMessage);
      }
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
        fileRef={coverFileRef}
        handleFileChange={(e) =>
          handleFileChange(
            e,
            setSelectedCoverFile,
            setProfileData,
            "cover_picture",
            "cover"
          )
        }
        defaultPicture="/cover_default.png"
        label="Cover Picture"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative">
        <div className="bg-base-100 shadow-xl rounded-box p-6">
          <div className="flex items-center space-x-2 sm:space-x-5">
            <div className="flex-shrink-0">
              <PictureForm
                pictureType="profile"
                profileData={profileData}
                setProfileData={setProfileData}
                selectedFile={selectedProfileFile}
                setSelectedFile={setSelectedProfileFile}
                fileRef={profileFileRef}
                handleFileChange={(e) =>
                  handleFileChange(
                    e,
                    setSelectedProfileFile,
                    setProfileData,
                    "profile_picture",
                    "profile"
                  )
                }
                defaultPicture="/default_profile.png"
                label="Profile Picture"
              />
            </div>

            <UserInfo profileData={profileData} />
          </div>
        </div>
        <div className="mt-3 pb-20">
          <ProfileDetailsForm
            profileData={profileData}
            setProfileData={setProfileData}
            id={currentUser?.id}
          />
        </div>
      </div>
    </div>
  );
}
