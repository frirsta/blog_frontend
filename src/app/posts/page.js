"use client";

import { useEffect, useState } from "react";
import api from "../../utils/axiosInstance";
import Post from "@/components/ui/Post";
import PostSkeleton from "./loading";

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
  }, []);

  const handleDelete = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  console.log(posts);
  return (
    <div>
      {error && <div className="error-message">{error}</div>}
      <ul>
        {loading ? (
          <PostSkeleton />
        ) : (
          <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-xl lg:grid-cols-1">
            {posts.map((post) => (
              <Post key={post.id} post={post} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </ul>
    </div>
  );
}

export default PostsPage;
