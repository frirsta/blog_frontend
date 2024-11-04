// FollowersList.js
"use client";
import React, { useEffect, useState } from "react";
import api from "@/utils/axiosInstance";
import Link from "next/link";
import FollowButton from "./FollowButton";

export default function FollowersList({ userId }) {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchFollowers = async () => {
      try {
        const response = await api.get(
          `profiles/?user__following__following=${userId}`
        );
        setFollowers(response.data);
      } catch (err) {
        console.error("Failed to fetch followers list:", err);
        setError("Failed to load followers list.");
      } finally {
        setLoading(false);
      }
    };

    fetchFollowers();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  console.log(followers);
  return (
    <div
      onClick={() =>
        document.getElementById("followers_list_modal").showModal()
      }
    >
      <div className="text-center">
        <h3 className="text-xl font-bold">
          {followers.length > 0 ? followers.length : "0"}
        </h3>
        <p className="text-sm text-base-content">Followers</p>
      </div>
      <dialog id="followers_list_modal" className="modal">
        <div className="modal-box h-[400px] max-w-[400px] w-[calc(100vw-88px)] p-0">
          <div className="sticky top-0 bg-base-200 border-b-[1px] pt-5">
            <h2 className="text-xl text-center font-bold mb-4">Followers</h2>
          </div>
          <div className="p-5">
            {followers.length === 0 ? (
              <p>No followers yet</p>
            ) : (
              <ul>
                {followers.map((follower) => (
                  <li
                    key={follower.id}
                    className="flex items-center justify-between py-2"
                  >
                    <Link
                      className="flex items-center"
                      href={`/profile/${follower.id}`}
                    >
                      <div className="avatar mr-3">
                        <div className="w-[24px] h-[24px] rounded-full">
                          <img src={follower.profile_picture} />
                        </div>
                      </div>
                      {follower.username}
                    </Link>
                    <FollowButton
                      userId={follower.id}
                      isFollowing={follower.is_following}
                      followId={follower.following_id}
                    />
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
