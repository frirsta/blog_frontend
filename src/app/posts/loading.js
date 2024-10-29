import React from "react";

const PostSkeleton = () => {
  return (
    <div>
      <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-xl lg:grid-cols-1 h-full w-full">
        <div className="flex flex-col">
          <div className="flex-shrink-0 skeleton aspect-video rounded-none"></div>
          <div className="flex flex-1 flex-col justify-between p-6">
            <div className="flex w-full flex-col gap-4">
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-4 w-72"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>

            <div className="flex items-center gap-4 mt-6">
              <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
              <div className="flex flex-col gap-4">
                <div className="skeleton h-4 w-20"></div>
                <div className="skeleton h-4 w-36"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;
