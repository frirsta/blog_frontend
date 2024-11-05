import api from "@/utils/axiosInstance";

export const deleteAccount = async (profileId, onSuccess, onError) => {
  try {
    await api.delete(`/profiles/${profileId}/`);
    onSuccess();
  } catch (error) {
    onError(error);
  }
};
