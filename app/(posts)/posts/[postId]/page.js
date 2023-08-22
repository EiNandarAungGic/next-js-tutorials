"use client";
import React from "react";
import { useParams } from "next/navigation";
import postData from "../../../../db/postData";

function Post() {
  const { postId } = useParams();
  const selectedPost = postData.find((post) => post.id == postId);

  if (!selectedPost) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h1 className="text-md">{selectedPost.question}</h1>
      <br />
      <h1 className="text-md text-green-500">{selectedPost.correct_answer}</h1>
    </div>
  );
}

export default Post;
