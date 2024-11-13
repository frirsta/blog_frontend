"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/utils/axiosInstance";

export default function FollowButton({ userId, isFollowing, followId }) {
  const [following, setFollowing] = useState(isFollowing);
  const [currentFollowId, setCurrentFollowId] = useState(followId);
  const { currentUser } = useAuth();
  const handleFollow = async () => {
    try {
      if (following && currentFollowId) {
        await api.delete(`/follows/${currentFollowId}/`);
        setCurrentFollowId(null);
        setFollowing(false);
      } else {
        const response = await api.post(`/follows/`, {
          follower_id: currentUser?.id,
          following_id: userId,
        });
        setCurrentFollowId(response.data.id);
        setFollowing(true);
      }
    } catch (error) {
      // console.error("Failed to follow/unfollow user:", error);
    }
  };

  return (
    <button
      className={`btn btn-xs ${following ? "btn-outline" : "btn-primary"}`}
      onClick={handleFollow}
    >
      {following ? "Unfollow" : "Follow"}
    </button>
  );
}
