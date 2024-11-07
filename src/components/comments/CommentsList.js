import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { deleteComment } from "@/utils/commentService";
import api from "@/utils/axiosInstance";
import ConfirmationModal from "../ui/ConfirmationModal";

const CommentsList = ({ postId, comments, setComments }) => {
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await api.get(`/comments/?post=${postId}`);
        setComments(response.data);
      } catch (err) {
        console.error("Failed to fetch comments:", err);
        setError("Failed to load comments.");
      }
    };

    if (postId) {
      fetchComments();
    }
  }, [postId, isModalOpen]);

  const openDeleteModal = (commentId) => {
    setCommentToDelete(commentId);
    setIsModalOpen(true);
  };

  const handleDeleteComment = () => {
    if (commentToDelete) {
      deleteComment(
        commentToDelete,
        () => {
          setComments(
            comments.filter((comment) => comment.id !== commentToDelete)
          );
          setIsModalOpen(false);
        },
        (error) => {
          console.error("Failed to delete comment:", error);
          setIsModalOpen(false);
          if (error.response) {
            switch (error.response.status) {
              case 403:
                alert("You do not have permission to delete this comment.");
                break;
              case 404:
                alert("Comment not found. It might have already been deleted.");
                break;
              case 500:
                alert("Server error occurred. Please try again later.");
                break;
              default:
                alert("Failed to delete comment. Please try again.");
            }
          } else {
            alert(
              "Failed to delete comment. Please check your network connection."
            );
          }
        }
      );
    }
  };

  if (error) {
    return <p className="text-error">{error}</p>;
  }

  return (
    <div className="comments-section mt-8">
      {comments.length > 0 ? (
        <ul className="comments-list">
          {comments.map((comment) => (
            <li key={comment.id} className="mb-2 border-b p-6">
              <div className="flex justify-between items-start">
                <Link href={`/profile/${comment.profile_id}`}>
                  <div className="flex items-center mr-3 mb-2">
                    <div className="avatar mr-2">
                      <div className="w-6 rounded-full">
                        <img src={comment.profile_picture} />
                      </div>
                    </div>
                    <p className="text-sm font-semibold capitalize">
                      {comment.user}
                    </p>
                    <p className="text-xs text-base-content/70 ml-3">
                      {comment.created_at}
                    </p>
                  </div>
                </Link>
                {comment.is_owner && (
                  <div className="dropdown dropdown-top dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-sm"
                    >
                      <BsThreeDots />
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded z-[1] w-36 p-0 shadow"
                    >
                      <li>
                        <button
                          className="btn btn-ghost rounded"
                          onClick={() => openDeleteModal(comment.id)}
                        >
                          <MdDelete /> Remove
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <p className="text-sm p-1">{comment.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center p-3">No comments yet.</p>
      )}
      {isModalOpen && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onConfirm={handleDeleteComment}
          onCancel={() => setIsModalOpen(false)}
          message="Are you sure you want to delete this comment?"
        />
      )}
    </div>
  );
};

export default CommentsList;
