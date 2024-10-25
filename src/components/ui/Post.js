import React from "react";
import Image from "next/image";
import Link from "next/link";
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
const Post = ({ post }) => {
  const formattedDate = format(new Date(post.created_at), "MMM dd, yyyy");
  const readingTime = calculateReadingTime(post.content);
  const maxContentLength = 100;

  const postImageSrc = getImageUrl(post.image);
  const authorImageSrc = getImageUrl(post.author_profile_picture);

  return (
    <div className="relative  px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="absolute inset-0">
        <div className="h-1/3 sm:h-2/3"></div>
      </div>
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-xl lg:grid-cols-1">
          <div className="bg-base-100 flex flex-col overflow-hidden rounded-lg shadow-lg">
            <div className="flex-shrink-0 bg-base-300">
              <Image
                width={500}
                height={300}
                className="h-48 w-full object-contain"
                src={postImageSrc}
                alt={`Image for ${post.title}`}
              />
            </div>
            <div className="flex flex-1 flex-col justify-between p-6">
              <div className="flex-1">
                <p className="text-sm font-medium text-info">
                  <Link href={`/posts/${post.id}`} className="hover:underline">
                    Article
                  </Link>
                </p>
                <Link href="#" className="mt-2 block">
                  <p className="text-xl font-semibold ">{post.title}</p>
                  <p className="mt-3 text-opacity-80 text-base-content">
                    {post.content?.length > maxContentLength
                      ? `${post.content.substring(0, maxContentLength)}...`
                      : post.content}
                  </p>
                </Link>
              </div>
              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                  <Link href="#">
                    <span className="sr-only">{post.author}</span>
                    <Image
                      width={100}
                      height={100}
                      className="h-10 w-10 rounded-full"
                      src={authorImageSrc}
                      alt={post.author || "Image not available"}
                    />
                  </Link>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">
                    <Link href="#" className="hover:underline">
                      {post.author}
                    </Link>
                  </p>
                  <div className="flex space-x-1 text-sm text-opacity-70 text-base-content">
                    <p>{formattedDate}</p>
                    <span aria-hidden="true">·</span>
                    <span>{readingTime} min read</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
