"use client";
import React, { useEffect, useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import api from "@/utils/axiosInstance";
import LikeButton from "@/components/post/LikeButton";
import CommentsList from "@/components/comments/CommentsList";
import CommentForm from "@/components/comments/CommentForm";

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
  const { id } = React.use(params);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const postImageSrc = getImageUrl(post?.image);
  const authorImageSrc = getImageUrl(post?.profile_picture);

  const handleNewComment = (newComment) => {
    setComments([newComment, ...comments]);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`posts/${id}/`);
        setPost(res.data);
        // console.log(res.data);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, comments]);

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
  const readingTime = calculateReadingTime(post?.content);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="py-8">
          <h1 className="text-3xl font-bold mb-2 capitalize">{post?.title}</h1>
          <p className="text-gray-500 text-sm">
            Published on <time>{formattedCreatedDate}</time>
          </p>
        </div>

        <Image
          width={1000}
          height={1000}
          src={postImageSrc}
          alt={post?.title}
          className="aspect-video mb-8 border-white border-[1px]"
        />

        <div className="mb-8 flex flex-col mx-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href={`/profiles/${post?.author}`}>
                <Image
                  width={10}
                  height={10}
                  className="w-10 h-10 rounded-full mr-2"
                  src={authorImageSrc}
                  alt={`Avatar of ${post?.owner}`}
                />
              </Link>
              <p className="text-sm font-medium text-gray-500">
                <Link href={`/profiles/${post?.author}`}>{post?.owner}</Link>
              </p>
            </div>
            <div className="flex items-center space-x-5">
              <div className="flex items-center space-x-2">
                <FaRegComment />
                &nbsp;<span>{post?.comments_count}</span>
              </div>
              <LikeButton
                postId={post?.id}
                likesCount={post?.likes_count}
                likesId={post?.likes_id}
                isLiked={post?.likes_id !== null}
              />
            </div>
          </div>
          <div className="flex">
            <p className="mt-3 text-sm font-medium text-gray-500">
              Updated on <time>{formattedUpdatedDate}</time>
            </p>
            <p className="mt-3 text-sm font-medium text-gray-500">
              {readingTime} min read
            </p>
          </div>

          <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
            <div
              className="text-left mt-3 text-opacity-80 text-base-content w-full"
              dangerouslySetInnerHTML={{
                __html: post?.content,
              }}
            />
          </div>
        </div>
        <div className="max-w-2xl mx-auto pb-20">
          <h3 className="text-2xl font-bold mb-6">
            Comments {post?.comments_count}
          </h3>
          <CommentForm postId={post?.id} onCommentAdded={handleNewComment} />
          <CommentsList postId={post?.id} />
        </div>
      </div>
    </div>
  );
}
