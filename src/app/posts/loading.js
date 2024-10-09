import React from "react";

const PostSkeleton = () => {
  return (
    <div className="relative px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
          <div className="bg-white flex flex-col overflow-hidden rounded-lg shadow-lg">
            <div className="flex-shrink-0">
              <div className="h-48 w-full bg-gray-300 animate-pulse" />
            </div>

            <div className="flex-1 flex flex-col justify-between p-6">
              <div className="flex-1">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-4 animate-pulse" />

                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-full animate-pulse" />
                  <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse" />
                </div>
              </div>

              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gray-300 animate-pulse" />
                </div>
                <div className="ml-3">
                  <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse mb-2" />
                  <div className="h-4 bg-gray-300 rounded w-1/4 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;
