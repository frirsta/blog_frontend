"use client";
import { useEffect, useState } from "react";
import api from "../utils/api";

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts/");
        setPosts(response.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError(err.response ? err.response.data : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            {post.image && <img src={post.image} alt={post.title} />}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostsPage;
