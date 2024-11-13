"use client";

import { useEffect, useState } from "react";
import { usePosts } from "@/context/PostContext";
import PrivateRoute from "@/components/routes/PrivateRoute";
import UserSearch from "@/components/UserSearch";
import Post from "@/components/ui/Post";
import api from "../../utils/axiosInstance";
import PostSkeleton from "./loading";

function PostsPage() {
  const { posts, setAllPosts } = usePosts();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await api.get("posts/");
        setAllPosts(response.data);
      } catch (err) {
        if (err.response && err.response.data) {
          setError(err.response.data.detail || "An unexpected error occurred.");
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [setAllPosts]);

  return (
    <PrivateRoute>
      <div>
        <UserSearch />
        {error && <div className="error-message">{error}</div>}
        <ul>
          {loading ? (
            <PostSkeleton />
          ) : (
            <div className="mx-auto p-3 grid max-w-lg gap-5 lg:max-w-xl lg:grid-cols-1">
              {posts.length === 0 ? (
                <p>No posts found.</p>
              ) : (
                posts.map((post) => <Post key={post.id} post={post} />)
              )}
            </div>
          )}
        </ul>
      </div>
    </PrivateRoute>
  );
}

export default PostsPage;
