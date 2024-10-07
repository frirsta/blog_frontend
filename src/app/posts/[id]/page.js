"use client";
import { useEffect, useState } from "react";
import api from "../../../utils/axiosInstance";

export default function PostDetails({ params }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`posts/${params.id}`);
        setPost(res.data);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading post</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
