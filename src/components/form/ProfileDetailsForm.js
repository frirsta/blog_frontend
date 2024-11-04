import Select from "react-select";
import { getNames } from "country-list";
import { motion } from "framer-motion";
import { useMessage } from "@/context/MessageContext";
import api from "@/utils/axiosInstance";

const countries = getNames().map((country) => ({
  value: country,
  label: country,
}));

export default function ProfileDetailsForm({
  profileData,
  setProfileData,
  id,
}) {
  const { showMessage } = useMessage();

  const handleProfileDetailsChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      bio: profileData.bio,
      location: profileData.location,
      website: profileData.website,
    };

    try {
      const response = await api.patch(`profiles/${id}/`, formData);
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
  return (
    <div className="card w-full max-w-md bg-base-100 shadow-xl z-10 m-auto">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card w-full max-w-md bg-base-100 shadow-xl z-10"
      >
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="card-body p-8">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                rows="3"
                value={profileData.bio || ""}
                onChange={handleProfileDetailsChange}
                className="textarea textarea-bordered"
                placeholder="Write a little about yourself"
              />

              <div>
                <span>Location</span>
                <div className="mt-1">
                  <Select
                    options={countries}
                    value={countries.find(
                      (c) => c.value === profileData.location
                    )}
                    onChange={(selectedOption) =>
                      handleProfileDetailsChange({
                        target: {
                          name: "location",
                          value: selectedOption.value,
                        },
                      })
                    }
                    placeholder="Select a country"
                    className="mb-2"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="website">Website</label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={profileData.website || ""}
                  onChange={handleProfileDetailsChange}
                  className="input input-bordered w-full"
                  placeholder="Enter your website URL"
                />
              </div>
              <div className="mt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="btn btn-primary w-full"
                >
                  Submit
                </motion.button>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
