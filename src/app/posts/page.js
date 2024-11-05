"use client";

import { useEffect, useState } from "react";
import Post from "@/components/ui/Post";
import PostSkeleton from "./loading";
import api from "../../utils/axiosInstance";

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("posts/");
        setPosts(response.data);
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
  }, [posts]);

  const handleDelete = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  return (
    <div>
      {error && <div className="error-message">{error}</div>}
      <ul>
        {loading ? (
          <PostSkeleton />
        ) : (
          <div className="mx-auto my-20 grid max-w-lg gap-5 lg:max-w-xl lg:grid-cols-1">
            {posts.length === 0 ? (
              <p>No posts found.</p>
            ) : (
              posts.map((post) => (
                <Post key={post.id} post={post} onDelete={handleDelete} />
              ))
            )}
          </div>
        )}
      </ul>
    </div>
  );
}

export default PostsPage;
