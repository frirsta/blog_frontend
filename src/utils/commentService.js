import api from "@/utils/axiosInstance";

export const deleteComment = async (commentId, onSuccess, onError) => {
  try {
    const response = await api.delete(`/comments/${commentId}/`);
    onSuccess(response);
  } catch (error) {
    // console.error("Failed to delete comment:", error);
    if (onError) onError(error);
  }
};
