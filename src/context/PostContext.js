"use client";
import { createContext, useState, useContext, useCallback } from "react";

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const addPost = useCallback((newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  }, []);

  const setAllPosts = useCallback((allPosts) => {
    setPosts(allPosts);
  }, []);

  return (
    <PostsContext.Provider value={{ posts, addPost, setAllPosts }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => useContext(PostsContext);
