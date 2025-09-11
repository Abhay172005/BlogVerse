import React from "react";

export default function SearchBar({ search, setSearch }) {
  return (
    <div className="search">
      <input
        placeholder="Search posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: 8,
          borderRadius: 8,
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
}
