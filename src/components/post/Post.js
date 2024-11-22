"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaRegComment } from "react-icons/fa";
import { format } from "date-fns";
import LikeButton from "./LikeButton";
import Category from "./Category";

const calculateReadingTime = (text) => {
  const wordsPerMinute = 100;
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};
const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return "/cover_picture_default.png";
  }
  return imagePath.startsWith("http")
    ? imagePath
    : `https://res.cloudinary.com/ddms7cvqu/${imagePath}`;
};
const Post = ({ post }) => {
  const formattedDate = format(new Date(post.created_at), "MMM dd, yyyy");
  const readingTime = calculateReadingTime(post.content);
  const maxContentLength = 100;

  const postImageSrc = getImageUrl(post.image);
  const authorImageSrc = getImageUrl(post.profile_picture);

  return (
    <div className="card bg-base-100 shadow-xl card-compact">
      <Link href={`/posts/${post.id}`}>
        <Image
          priority
          width={1000}
          height={1000}
          className="aspect-video object-cover rounded-t-lg"
          src={postImageSrc}
          alt={`Image for ${post.title}`}
        />
      </Link>
      <div className="card-body">
        <div className="flex items-center justify-between">
          {post.category.map((category) => (
            <Category
              size={"sm"}
              key={category.id}
              categoryName={category.name}
            />
          ))}
          <div className="flex items-center space-x-4 ml-auto">
            <LikeButton
              postId={post.id}
              likesCount={post.likes_count}
              likesId={post.likes_id}
              isLiked={post.likes_id !== null}
            />
            <Link href={`/posts/${post.id}`}>
              <div className="flex items-center space-x-2">
                <FaRegComment className="w-5 h-5" />
                <span className="text-base-content/70">
                  {post.comments_count}
                </span>
              </div>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="card-title capitalize">{post.title}</h2>
        </div>

        <div
          className="mb-3 font-normal text-base-content/80 "
          dangerouslySetInnerHTML={{
            __html:
              post.content?.length > maxContentLength
                ? `${post.content.substring(0, maxContentLength)}...`
                : post.content,
          }}
        />

        <div className="mt-auto flex items-center">
          <div className="flex-shrink-0">
            <Link href={`/profile/${post?.owner_id}`}>
              <span className="sr-only">{post.user}</span>
              <Image
                width={100}
                height={100}
                className="h-8 w-8 rounded-full object-cover"
                src={authorImageSrc}
                alt={post.user || "Image not available"}
              />
            </Link>
          </div>
          <div className="ml-3">
            <p className="text-xs font-medium capitalize">
              <Link
                href={`/profile/${post?.owner_id}`}
                className="hover:underline"
              >
                {post.user}
              </Link>
            </p>
            <div className="flex space-x-1 text-xs text-opacity-70 text-base-content">
              <p>{formattedDate}</p>
              <span aria-hidden="true">·</span>
              <span>{readingTime} min read</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
