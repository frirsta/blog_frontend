"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import api from "@/utils/axiosInstance";
import { UserInfo } from "@/components/profile/UserInfo";
import ProfileStat from "@/components/profile/ProfileStat";
import FollowButton from "@/components/follows/FollowButton";
import FollowingList from "@/components/follows/FollowingList";
import FollowersList from "@/components/follows/FollowersList";
import CoverImage from "@/components/profile/CoverImage";
import TabList from "@/components/profile/TabList";
import Menu from "@/components/profile/Menu";

export default function ProfilePage() {
  const { id } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const { currentUser, handleLogout } = useAuth();
  const isCurrentUser = currentUser?.id === profileData?.id;

  useEffect(() => {
    if (!id) return;

    const fetchProfile = async () => {
      try {
        const response = await api.get(`profiles/${id}/`);
        setProfileData(response.data);
      } catch (err) {
        setError("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await api.get(
          `posts/?likes__user__profile=&author__profile=${id}`
        );
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchLikedPosts = async () => {
      try {
        const response = await api.get(`posts/?likes__user__profile=${id}`);
        setLikedPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch liked posts:", error);
      }
    };

    fetchLikedPosts();

    fetchProfile();
    fetchPosts();
    fetchLikedPosts();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  console.log(likedPosts);

  return (
    <div>
      <div className="relative">
        {profileData?.cover_picture && (
          <CoverImage coverPicture={profileData?.cover_picture} />
        )}
      </div>
      <div className="max-w-4xl mx-auto pb-8">
        <div className="bg-base-100 shadow-xl rounded-box p-6 -mt-20 relative">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-5">
              <div className="flex-shrink-0">
                <Image
                  className="mx-auto h-24 w-24 sm:h-32 sm:w-32 rounded-full border-4 border-base-100"
                  src={profileData?.profile_picture || "/profile_default.png"}
                  alt={profileData?.username || "Profile Picture"}
                  width={128}
                  height={128}
                />
              </div>
              <UserInfo profileData={profileData} />
            </div>
            <div>
              {isCurrentUser ? (
                <Menu onLogout={handleLogout} />
              ) : (
                <FollowButton
                  userId={profileData?.id}
                  isFollowing={profileData?.is_following}
                  followId={profileData?.following_id}
                />
              )}
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-5 text-center">
            <FollowersList userId={profileData?.id} />
            <FollowingList
              userId={profileData?.id}
              followId={profileData?.following_id}
              isFollowing={profileData?.is_following}
            />
            <ProfileStat label="Posts" value={posts.length} />
          </div>
        </div>

        <div className="mt-8 w-full">
          <TabList myPosts={posts} likedPosts={likedPosts} />
        </div>
      </div>
    </div>
  );
}
