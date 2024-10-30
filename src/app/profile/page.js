"use client";
import Image from "next/image";
import { HiDotsVertical } from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import api from "@/utils/axiosInstance";
import Post from "@/components/ui/Post";
import Link from "next/link";
import ProfileStat from "@/components/profile/ProfileStat";

export default function ProfilePage() {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get(`posts/user/${currentUser?.id}/`);
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (currentUser) {
      fetchPosts();
    }
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-base-200">
      <div className="relative h-80">
        <Image
          width={2000}
          height={2000}
          src={currentUser.cover_picture}
          alt="Cover"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative">
        <div className="bg-base-100 shadow-xl rounded-box p-6">
          <div className="sm:flex sm:items-start sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="flex-shrink-0">
                <Image
                  className="mx-auto h-32 w-32 rounded-full border-4 border-base-100"
                  src={currentUser.profile_picture}
                  alt={currentUser?.username}
                  width={128}
                  height={128}
                />
              </div>
              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                <h1 className="text-3xl font-bold text-base-content">
                  {currentUser?.username}
                </h1>
                <p className="text-sm font-medium text-base-content/70">
                  {currentUser?.username}
                </p>
                <p className="text-sm text-base-content/70 mt-1">
                  {currentUser?.bio}
                </p>
              </div>
            </div>
            {currentUser.is_owner && (
              <div className="mt-5 flex justify-center sm:mt-0 absolute top-0 py-3 pr-8 right-0 sm:relative sm:p-0">
                <div className="dropdown dropdown-left">
                  <button tabIndex={0} className="btn btn-sm">
                    <HiDotsVertical />
                  </button>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                  >
                    <li>
                      <Link href="profile/edit/">Edit profile</Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-4 text-center">
            <ProfileStat label="Followers" value={100} />
            <ProfileStat label="Following" value={100} />
            <ProfileStat label="Posts" value={posts.length} />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <h2 className="text-2xl font-bold text-base-content mb-6">
          Recent Blog Posts
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
