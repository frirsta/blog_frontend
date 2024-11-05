import React from "react";
import Post from "../ui/Post";

const TabList = ({ myPosts, likedPosts }) => {
  return (
    <div role="tablist" className="tabs tabs-bordered grid-cols-2">
      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab"
        aria-label="My Posts"
      />
      <div role="tabpanel" className="tab-content p-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 pb-20 px-3">
          {myPosts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>

      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab"
        aria-label="Liked Posts"
        defaultChecked
      />
      <div role="tabpanel" className="tab-content p-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 pb-20 px-3">
          {likedPosts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabList;
