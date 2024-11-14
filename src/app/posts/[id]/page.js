"use client";
import React, { useEffect, useState } from "react";
import api from "@/utils/axiosInstance";
import PrivateRoute from "@/components/routes/PrivateRoute";
import CommentsList from "@/components/comments/CommentsList";
import CommentForm from "@/components/comments/CommentForm";
import PostDetails from "@/components/ui/PostDetails";

export default function PostPage({ params }) {
  const { id } = React.use(params);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  const handleNewComment = (newComment) => {
    setComments([newComment, ...comments]);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`posts/${id}/`);
        setPost(res.data);
        // console.log(res.data);
      } catch (err) {
        // console.error("Error fetching post:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, comments]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading post</div>;
  // console.log(post);

  return (
    <PrivateRoute>
      <div>
        <PostDetails post={post} />
        <div className="max-w-2xl mx-auto pb-20 px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold mb-6">
            Comments {post?.comments_count}
          </h3>
          <CommentForm postId={post?.id} onCommentAdded={handleNewComment} />
          <CommentsList
            postId={post?.id}
            comments={comments}
            setComments={setComments}
          />
        </div>
      </div>
    </PrivateRoute>
  );
}
