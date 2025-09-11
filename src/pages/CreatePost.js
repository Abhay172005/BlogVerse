import React from "react";
import PostForm from "../components/PostForm";

export default function CreatePost({ user, fetchPosts }) {
  return (
    <div style={{ maxWidth: 900, margin: "28px auto", padding: "0 20px" }}>
      <h2>Create Post</h2>
      <PostForm user={user} refreshPosts={fetchPosts} />
    </div>
  );
}
