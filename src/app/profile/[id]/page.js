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
import Menu from "@/components/profile/Menu";
import Post from "@/components/ui/Post";

export default function ProfilePage() {
  const { id } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
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
        const response = await api.get(`posts/user/${id}/`);
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
    fetchPosts();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  console.log(profileData);
  return (
    <div>
      <div className="relative">
        {profileData?.cover_picture && (
          <CoverImage coverPicture={profileData?.cover_picture} />
        )}
      </div>
      <div className="max-w-5xl mx-auto pb-8">
        <div className="bg-base-100 shadow-xl rounded-box p-6 -mt-20 relative">
          <div className="sm:flex sm:items-start sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="flex-shrink-0">
                <Image
                  className="mx-auto h-32 w-32 rounded-full border-4 border-base-100"
                  src={profileData?.profile_picture || "/profile_default.png"}
                  alt={profileData?.username || "Profile Picture"}
                  width={128}
                  height={128}
                />
              </div>
              <UserInfo profileData={profileData} />
            </div>
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

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-base-content mb-6">
            Recent Blog Posts
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 pb-20">
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
