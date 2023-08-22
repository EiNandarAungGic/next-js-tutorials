import React from "react";
import postData from "../../../db/postData";
import Link from "next/link";

function Post() {
  return (
    <div>
      <h1 className="text-4xl">All Posts</h1>
      <ul className="my-3 mx-2 py-2">
        {postData.map((post, index) => (
          <li key={index}>
            <Link href={`posts/${post.id}`}>
              <span>{post.category}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Post;
