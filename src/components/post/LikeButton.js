"use client";
import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import api from "@/utils/axiosInstance";

export default function LikeButton({ postId, isLiked, likesId, likesCount }) {
  const [liked, setLiked] = useState(isLiked);
  const [likeId, setLikeId] = useState(likesId);
  const [likes, setLikes] = useState(likesCount);

  const handleLike = async () => {
    try {
      if (liked) {
        await api.delete(`/likes/${likeId}/`);
        setLiked(false);
        setLikeId(null);
        setLikes((prevCount) => prevCount - 1);
      } else {
        const response = await api.post(`/likes/`, { post: postId });
        setLiked(true);
        setLikeId(response.data.id);
        setLikes((prevCount) => prevCount + 1);
      }
    } catch (error) {
      console.error("Failed to like/unlike post:", error);
    }
  };

  return (
    <button onClick={handleLike} className="flex items-center space-x-2">
      {liked ? (
        <FaHeart className="w-5 h-5" />
      ) : (
        <FaRegHeart className="w-5 h-5" />
      )}
      <span className="text-base-content/70">{likes}</span>
    </button>
  );
}
