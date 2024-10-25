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
  console.log(posts);
  return (
    <div>
      {error && <div className="error-message">{error}</div>}
      <ul>
        {loading ? (
          <PostSkeleton />
        ) : (
          posts.map((post) => <Post key={post.id} post={post} />)
        )}
      </ul>
    </div>
  );
}

export default PostsPage;
