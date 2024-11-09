import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRegComment } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa6";
import { FaRegCalendar } from "react-icons/fa";
import { format } from "date-fns";
import { useMessage } from "@/context/MessageContext";
import ConfirmationModal from "../post/ConfirmationModal";
import LikeButton from "../post/LikeButton";
import Menu from "../post/Menu";
import Category from "./Category";
import Tag from "./Tag";
import api from "@/utils/axiosInstance";

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
const PostDetails = ({ post, onDelete }) => {
  const postImageSrc = getImageUrl(post?.image);
  const authorImageSrc = getImageUrl(post?.profile_picture);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showMessage } = useMessage();
  const router = useRouter();
  const formattedCreatedDate = format(
    new Date(post?.created_at),
    "MMM dd, yyyy"
  );
  const formattedUpdatedDate = format(
    new Date(post?.updated_at),
    "MMM dd, yyyy"
  );
  const readingTime = calculateReadingTime(post?.content);

  const handleDelete = async () => {
    try {
      await api.delete(`posts/${post.id}/`);
      showMessage("success", "Post deleted successfully");
      router.push("/posts");
    } catch (error) {
      // console.error("Failed to delete the post:", error);
      setError(error.response?.data);
      // console.log(error.response?.data);
      showMessage("error", "Failed to delete the post");
    }
  };
  return (
    <div>
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-12">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {post.category.map((category) => (
              <Category key={category.id} categoryName={category.name} />
            ))}
            <div className="flex items-center space-x-4 text-sm text-base-content/70">
              <div className="flex items-center">
                <FaRegCalendar className="w-4 h-4 mr-1" />
                <span>{formattedUpdatedDate}</span>
              </div>
              <span>•</span>
              <div className="flex items-center">
                <FaRegClock className="w-4 h-4 mr-1" />
                <span>{readingTime} min read</span>
              </div>
            </div>
          </div>

          <div className="mt-auto flex items-center my-6 pt-6">
            <div className="flex-shrink-0">
              <Link href={`/profile/${post?.owner_id}`}>
                <span className="sr-only">{post.user}</span>
                <Image
                  width={100}
                  height={100}
                  className="h-8 w-8 rounded-full"
                  src={authorImageSrc}
                  alt={post.user || "Image not available"}
                />
              </Link>
            </div>
            <div className="flex justify-between items-center w-full">
              <div className="ml-3">
                <p className="text-xs font-medium capitalize">
                  <Link
                    href={`/profile/${post?.owner_id}`}
                    className="hover:underline"
                  >
                    {post.user}
                  </Link>
                </p>
              </div>
              {post.is_owner && (
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
        </header>

        <div className="relative mb-8">
          <Image
            width={1000}
            height={1000}
            src={postImageSrc}
            alt={post?.title}
            className="aspect-video object-contain"
          />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold my-6 text-base-content leading-tight capitalize">
          {post.title}
        </h1>
        <div
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="flex justify-end items-center py-5">
          {post.tags.map((tag) => (
            <Tag key={tag.id} tagName={tag.name} />
          ))}
        </div>
        <footer className="border-t border-base-300 pt-6 mb-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <LikeButton
                postId={post.id}
                likesCount={post.likes_count}
                likesId={post.likes_id}
                isLiked={post.likes_id !== null}
              />
              <span className="text-base-content/70">likes</span>
              <FaRegComment className="w-5 h-5" />
              <span className="text-base-content/70">
                {post.comments_count} comments
              </span>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default PostDetails;
