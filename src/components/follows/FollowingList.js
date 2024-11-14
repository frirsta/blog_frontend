"use client";
import React, { useEffect, useState } from "react";
import api from "@/utils/axiosInstance";
import Link from "next/link";
import Image from "next/image";
import FollowButton from "./FollowButton";
import { useAuth } from "@/context/AuthContext";

export default function FollowingList({ userId }) {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();
  useEffect(() => {
    if (!userId) return;

    const fetchFollowing = async () => {
      try {
        const response = await api.get(
          `profiles/?user__followers__follower=${userId}`
        );
        setFollowing(response.data);
      } catch (err) {
        // console.error("Failed to fetch following list:", err);
        setError("Failed to load following list.");
      } finally {
        setLoading(false);
      }
    };

    fetchFollowing();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div
      className="cursor-pointer"
      onClick={() =>
        document.getElementById("following_list_modal").showModal()
      }
    >
      <div className="text-center">
        <h3 className="text-xl font-bold">
          {following.length > 0 ? following.length : "0"}
        </h3>
        <p className="text-sm text-base-content">Following</p>
      </div>

      <dialog id="following_list_modal" className="modal">
        <div className="modal-box h-[400px] max-w-[400px] w-[calc(100vw-88px)] p-0">
          <div className="sticky top-0 bg-base-200 border-b-[1px] pt-5">
            <h2 className="text-xl text-center font-bold mb-4">Following</h2>
          </div>
          <div className="p-5">
            {following.length === 0 ? (
              <p>Not following anyone yet</p>
            ) : (
              <ul>
                {following.map((follow) => (
                  <li
                    key={follow.id}
                    className="flex items-center justify-between py-2"
                  >
                    <Link
                      className="flex items-center"
                      href={`/profile/${follow.id}`}
                    >
                      <div className="avatar mr-3">
                        <div className="w-[24px] h-[24px] rounded-full">
                          <Image
                            alt={follow.username}
                            src={follow.profile_picture}
                            width={100}
                            height={100}
                          />
                        </div>
                      </div>
                      {follow.username}
                    </Link>
                    {currentUser.id === follow.id ? (
                      ""
                    ) : (
                      <FollowButton
                        userId={follow.id}
                        isFollowing={follow.is_following}
                        followId={follow.following_id}
                      />
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
