import React, { useState } from "react";
import PostList from "../components/PostList";
import SearchBar from "../components/SearchBar";

export default function Home({ user, posts, fetchPosts }) {
  const [search, setSearch] = useState("");

  return (
    <>
      {/* Hero Section */}
      <div className="hero">
        <div className="container">
          <h1>BlogVerse</h1>
          <p>
      Discover a world of blogs - stories, ideas, and perspectives to inspire,inform, and entertain.
          </p>
        </div>
      </div>

      {/* 🔎 Search bar comes right below Hero */}
      <div style={{ maxWidth: "800px", margin: "25px auto" }}>
        <SearchBar search={search} setSearch={setSearch} />
      </div>

      {/* Blog Grid */}
      <main className="main" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <PostList
          posts={posts}
          user={user}
          refreshPosts={fetchPosts}
          search={search}
        />
      </main>
    </>
  );
}
