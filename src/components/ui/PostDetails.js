import React from "react";
import { FaRegBookmark } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa6";
import { FaRegCalendar } from "react-icons/fa";
import LikeButton from "../post/LikeButton";
import Image from "next/image";

import { format } from "date-fns";
import Link from "next/link";
import Tag from "./Tag";

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
const PostDetails = ({ post }) => {
  const postImageSrc = getImageUrl(post?.image);
  const authorImageSrc = getImageUrl(post?.profile_picture);

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
    <div>
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-12">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="badge badge-outline text-xs font-semibold px-3 py-1">
              {post.category.map((category) => category.name)}
            </span>
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
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-base-content leading-tight capitalize">
            {post.title}
          </h1>
          <Link href={`/profile/${post.owner_id}`}>
            <div className="flex items-center mb-8">
              <Image
                width={64}
                height={64}
                className="rounded-full mr-4"
                src={authorImageSrc}
                alt={`Avatar of ${post.owner}`}
              />
              <div>
                <p className="font-semibold text-lg text-base-content capitalize">
                  {post.owner}
                </p>
              </div>
            </div>
          </Link>
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
        <div className="flex items-center">

        {post.tags.map((tag) => (
          <Tag key={tag.id} tagName={tag.name} />
        ))}
        </div>
        <div
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

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

            <div
              className="tooltip tooltip-left"
              data-tip="Bookmark coming soon!"
            >
              <FaRegBookmark className="w-5 h-5" />
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default PostDetails;
