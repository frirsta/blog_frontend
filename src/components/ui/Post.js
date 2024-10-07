import Link from "next/link";
import React from "react";

const calculateReadingTime = (text) => {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

const Post = ({ post }) => {
  const readingTime = calculateReadingTime(post.content);
  const maxContentLength = 100;
  return (
    <div className="relative  px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="absolute inset-0">
        <div className="h-1/3 sm:h-2/3"></div>
      </div>
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
          <div className="bg-white flex flex-col overflow-hidden rounded-lg shadow-lg">
            <div className="flex-shrink-0">
              <img
                className="h-48 w-full object-cover"
                src={post.image}
                alt={post.title}
              />
            </div>
            <div className="flex flex-1 flex-col justify-between p-6">
              <div className="flex-1">
                <p className="text-sm font-medium text-indigo-600">
                  <Link href="#" className="hover:underline">
                    Article
                  </Link>
                </p>
                <Link href="#" className="mt-2 block">
                  <p className="text-xl font-semibold text-gray-900">
                    {post.title}
                  </p>
                  <p className="mt-3 text-base text-gray-500">
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
                    <img className="h-10 w-10 rounded-full" src={""} alt="" />
                  </Link>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    <Link href="#" className="hover:underline">
                      {post.author}
                    </Link>
                  </p>
                  <div className="flex space-x-1 text-sm text-gray-500">
                    <p>{post.created_at}</p>
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
