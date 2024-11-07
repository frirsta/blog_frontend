import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/utils/axiosInstance";

const CommentForm = ({ postId, onCommentAdded }) => {
  const { currentUser } = useAuth();
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await api.post("/comments/", {
        post: postId,
        content: newComment,
      });
      onCommentAdded(response.data);
      setNewComment("");
    } catch (err) {
      console.error("Failed to submit comment:", err);
      setError("Failed to submit comment.");
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="comment-form mt-4">
      <form className="mb-6" onSubmit={handleCommentSubmit}>
        <textarea
          className="textarea textarea-bordered w-full mb-4 py-2 px-4"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows="3"
          id="comment"
          name="comment"
          required
        />
        <button type="submit" className="btn btn-primary mt-2 text-xs">
          Post Comment
        </button>
        {error && <p className="text-error">{error}</p>}
      </form>
    </div>
  );
};

export default CommentForm;
