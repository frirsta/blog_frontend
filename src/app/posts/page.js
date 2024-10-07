"use client";

import { useEffect, useState } from "react";
import api from "../../utils/axiosInstance";

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts/");
        setPosts(response.data);
      } catch (err) {
        if (err.response && err.response.data) {
          setError(err.response.data.detail || "An unexpected error occurred.");
        } else {
          setError("An unexpected error occurred.");
        }
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {error && <div className="error-message">{error}</div>}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default PostsPage;
