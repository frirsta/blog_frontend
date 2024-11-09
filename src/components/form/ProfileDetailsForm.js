"use client";

import { useEffect } from "react";
import { getNames } from "country-list";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import api from "@/utils/axiosInstance";
import { useMessage } from "@/context/MessageContext";
import { useAuth } from "@/context/AuthContext";

const Select = dynamic(() => import("react-select"), { ssr: false });

const countries = getNames().map((country) => ({
  value: country,
  label: country,
}));

export default function ProfileDetailsForm({
  profileData,
  setProfileData,
  title,
}) {
  const { showMessage } = useMessage();
  const { currentUser } = useAuth();
  const handleProfileDetailsChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLocationChange = (selectedOption) => {
    if (selectedOption) {
      setProfileData((prevData) => ({
        ...prevData,
        location: selectedOption.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      bio: profileData.bio,
      location: profileData.location,
      website: profileData.website,
    };

    try {
      const response = await api.patch(`profiles/${currentUser.id}/`, formData);
      showMessage("success", "Profile details updated successfully");
      setProfileData((prevData) => ({
        ...prevData,
        ...response.data,
      }));
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail || "Failed to update profile details";
      showMessage("error", errorMessage);
    }
  };

  useEffect(() => {
    setProfileData({
      bio: currentUser?.bio || "",
      location: currentUser?.location || "",
      website: currentUser?.website || "",
    });
  }, [currentUser, setProfileData]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card w-full max-w-md bg-base-100 sm:shadow-2xl z-10"
      >
        <div className="card-body p-8">
          {title && (
            <div className="mt-6 mb-6">
              <h2 className="card-title text-4xl font-extrabold pb-3 justify-center">
                {title}
              </h2>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="label font-bold ml-2">Bio</span>
              <textarea
                id="bio"
                name="bio"
                rows="3"
                value={profileData?.bio || ""}
                onChange={handleProfileDetailsChange}
                className="textarea textarea-bordered w-full placeholder:text-base-content/50"
                placeholder="Write a little about yourself"
              />
            </div>

            <div>
              <span className="label font-bold ml-2">Location</span>
              <div className="mt-1">
                <Select
                  options={countries}
                  value={
                    countries.find((c) => c.value === profileData?.location) ||
                    null
                  }
                  onChange={handleLocationChange}
                  placeholder="Select a country"
                  className="location-select"
                  classNamePrefix="location-select"
                  styles={{
                    control: (styles) => ({
                      ...styles,
                      backgroundColor: "oklch(var(--b1))",
                      borderRadius: "var(--rounded-btn, 0.5rem)",
                      height: "3rem",
                      minHeight: "3rem",
                      paddingInlineStart: "8px",
                      paddingInlineEnd: "8px",
                      borderColor: "var(--fallback-bc,oklch(var(--bc)/0.2))",
                      color: "oklch(var(--bc))",
                    }),
                    singleValue: (styles) => ({
                      ...styles,
                      color: "oklch(var(--bc))",
                      fontSize: "0.875rem",
                    }),
                    placeholder: (styles) => ({
                      ...styles,
                      color: "oklch(var(--bc)/0.5)",
                    }),
                    indicatorSeparator: (styles) => ({
                      ...styles,
                      display: "none",
                    }),
                  }}
                />
              </div>
            </div>
            <div>
              <span className="label font-bold ml-2">Website</span>
              <input
                type="url"
                id="website"
                name="website"
                value={profileData?.website || ""}
                onChange={handleProfileDetailsChange}
                className="input input-bordered w-full placeholder:text-base-content/50"
                placeholder="Enter your website URL"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="btn bg-base-content text-base-100 w-full"
            >
              Submit
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
