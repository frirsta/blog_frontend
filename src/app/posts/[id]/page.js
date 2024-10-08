"use client";
import { useEffect, useState } from "react";
import api from "../../../utils/axiosInstance";
const calculateReadingTime = (text) => {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};
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

  const readingTime = calculateReadingTime(post.content);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="py-8">
          <h1 className="text-3xl font-bold mb-2 capitalize">{post.title}</h1>
          <p className="text-gray-500 text-sm">
            Published on <time>{post.created_at}</time>
          </p>
        </div>

        <img
          src={post.image}
          alt="Featured image"
          className="w-full h-96 mb-8 object-contain border-white border-[1px] bg-white"
        />

        <div className="mb-8 flex flex-col">
          <div className="flex items-center">
            <img
              className="w-10 h-10 rounded-full mr-2"
              src={"/profile_default.png"}
              alt="Avatar of Jonathan Reinink"
            />
            <p className="text-sm font-medium text-gray-500">{post.author}</p>
          </div>
          <div className="flex">
            <p className="ml-1 mt-3 text-sm font-medium text-gray-500">
              {readingTime} min read
            </p>
            <p className="ml-10 mt-3 text-sm font-medium text-gray-500">
              {post.created_at}
            </p>
          </div>
        </div>
        <div className="ml-1 prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
          <p>{post.content}</p>
        </div>
      </div>
    </div>
  );
}
