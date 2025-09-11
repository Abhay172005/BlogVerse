import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function PostForm({ user, refreshPosts, refreshCurrentPost, existingPost, onDone }) {
  const [title, setTitle] = useState(existingPost ? existingPost.title : "");
  const [description, setDescription] = useState(existingPost ? existingPost.description : "");
  const [content, setContent] = useState(existingPost ? existingPost.content : "");
  const [category, setCategory] = useState(existingPost ? existingPost.category : "General");
  const savingText = existingPost ? "Update Post" : "Publish Post";

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !content) {
      return alert("Title, description and content are required");
    }

    
    let username = "Anonymous";
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .single();
      username = profile?.username || "Anonymous";
    }

    if (existingPost) {
      await supabase
        .from("posts")
        .update({
          title,
          description,
          content,
          category,
          updated_at: new Date(),
          author_username: username,
        })
        .eq("id", existingPost.id);

      if (refreshPosts) await refreshPosts();
      if (refreshCurrentPost) await refreshCurrentPost();
      onDone?.();
    } else {
      const { data, error } = await supabase
        .from("posts")
        .insert([
          {
            title,
            description,
            content,
            category,
            author_id: user.id,
            author_username: username,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Error creating post:", error);
        alert("Failed to create post");
        return;
      }

      if (refreshPosts) await refreshPosts();

      navigate(`/post/${data.id}`);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* ✅ Description as textarea with fixed height */}
      <textarea
        placeholder="Short Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ minHeight: "100px" }}
      />

      <textarea
        placeholder="Full Blog Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ minHeight: "160px" }}
      />

      <input
        placeholder="Category (e.g. Tech)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <button className="btn" type="submit">
        {savingText}
      </button>
    </form>
  );
}
