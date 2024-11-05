"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { useAuth } from "@/context/AuthContext";
import { useMessage } from "@/context/MessageContext";
import api from "@/utils/axiosInstance";
import Menu from "../post/Menu";
import ConfirmationModal from "../post/ConfirmationModal";
import LikeButton from "../post/LikeButton";

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
const Post = ({ post, onDelete }) => {
  const { currentUser } = useAuth();
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showMessage } = useMessage();
  const formattedDate = format(new Date(post.created_at), "MMM dd, yyyy");
  const readingTime = calculateReadingTime(post.content);
  const maxContentLength = 100;

  const postImageSrc = getImageUrl(post.image);
  const authorImageSrc = getImageUrl(post.profile_picture);

  const handleDelete = async () => {
    try {
      await api.delete(`posts/${post.id}/`);
      onDelete(post.id);
    } catch (error) {
      console.error("Failed to delete the post:", error);
      setError(error.response?.data);
      console.log(error.response?.data);
      showMessage("error", "Failed to delete the post");
    }
  };
  return (
    <div className={`flex flex-col overflow-hidden rounded-lg shadow-lg`}>
      <div className="flex-shrink-0">
        <Image
          width={1000}
          height={1000}
          className="aspect-video"
          src={postImageSrc}
          alt={`Image for ${post.title}`}
        />
      </div>
      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-info">
              <Link href={`/posts/${post.id}`} className="hover:underline">
                Article
              </Link>
            </p>

            <LikeButton
              postId={post.id}
              isLiked={post.likes_id !== null}
              likesId={post.likes_id}
              likesCount={post.likes_count}
            />
          </div>
          <Link href={`/posts/${post.id}`} className="mt-2 block">
            <p className="text-xl font-semibold ">{post.title}</p>
            <div className="prose">
              <div
                className="mt-3 text-opacity-80 text-base-content"
                dangerouslySetInnerHTML={{
                  __html:
                    post.content?.length > maxContentLength
                      ? `${post.content.substring(0, maxContentLength)}...`
                      : post.content,
                }}
              />
            </div>
          </Link>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <Link href={`/profiles/${post.author}`}>
              <span className="sr-only">{post.owner}</span>
              <Image
                width={100}
                height={100}
                className="h-10 w-10 rounded-full"
                src={authorImageSrc}
                alt={post.owner || "Image not available"}
              />
            </Link>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">
              <Link
                href={`/profiles/${post.author}`}
                className="hover:underline"
              >
                {post.owner}
              </Link>
            </p>
            <div className="flex space-x-1 text-sm text-opacity-70 text-base-content">
              <p>{formattedDate}</p>
              <span aria-hidden="true">·</span>
              <span>{readingTime} min read</span>
            </div>
            {currentUser && currentUser.id === post.author && (
              <>
                <Menu onDelete={() => setIsModalOpen(true)} />
                <ConfirmationModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  onConfirm={() => {
                    handleDelete();
                    setIsModalOpen(false);
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
