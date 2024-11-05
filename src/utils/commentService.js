import api from "@/utils/axiosInstance";

export const deleteComment = async (
  commentId,
  onDeleteSuccess,
  onDeleteFailure
) => {
  try {
    await api.delete(`/comments/${commentId}/`);
    if (onDeleteSuccess) {
      onDeleteSuccess();
    }
  } catch (error) {
    console.error("Failed to delete comment:", error);
    if (onDeleteFailure) {
      onDeleteFailure(error);
    }
  }
};
