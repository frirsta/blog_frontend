"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/utils/axiosInstance";
import { format } from "date-fns";

const calculateReadingTime = (text) => {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return "/post_image_default.png";
  }
  return imagePath.startsWith("http")
    ? imagePath
    : `https://res.cloudinary.com/ddms7cvqu/${imagePath}`;
};

export default function PostDetails({ params }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = React.use(params);
  const postImageSrc = getImageUrl(post?.image);
  const authorImageSrc = getImageUrl(post?.profile_picture);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`posts/${id}/`);
        setPost(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading post</div>;

  const formattedCreatedDate = format(
    new Date(post?.created_at),
    "MMM dd, yyyy"
  );
  const formattedUpdatedDate = format(
    new Date(post?.updated_at),
    "MMM dd, yyyy"
  );
  const readingTime = calculateReadingTime(post.content);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="py-8">
          <h1 className="text-3xl font-bold mb-2 capitalize">{post.title}</h1>
          <p className="text-gray-500 text-sm">
            Published on <time>{formattedCreatedDate}</time>
          </p>
        </div>

        <Image
          width={1000}
          height={1000}
          src={postImageSrc}
          alt={post.title}
          className="aspect-video mb-8 border-white border-[1px]"
        />

        <div className="mb-8 flex flex-col">
          <div className="flex items-center">
            <Image
              width={10}
              height={10}
              className="w-10 h-10 rounded-full mr-2"
              src={authorImageSrc}
              alt={`Avatar of ${post.author}`}
            />
            <p className="text-sm font-medium text-gray-500">{post.author}</p>
          </div>
          <div className="flex">
            <p className="mt-3 text-sm font-medium text-gray-500">
              Updated on <time>{formattedUpdatedDate}</time>
            </p>
            <p className="mt-3 text-sm font-medium text-gray-500">
              {readingTime} min read
            </p>
          </div>
        </div>
        <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
          <p>{post.content}</p>
        </div>
      </div>
    </div>
  );
}
