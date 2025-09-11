import React from "react";

export default function PostCard({ post, children }) {
  return (
    <div
      className="card"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "420px", 
        maxHeight: "420px", 
      }}
    >
      {/* Top section (header + description) */}
      <div>
        {/* Header */}
        <div className="meta">
          <div>
            <h3>{post.title}</h3>
            <div className="meta-small">
              By {post.author_username || "Unknown"}
            </div>
          </div>
          <div className="meta-small">
            {new Date(post.created_at).toLocaleDateString()}
          </div>
        </div>

        {/* ✅ Description inside fixed box */}
        <div
          style={{
            margin: "12px 16px",
            padding: "12px",
            background: "#fafafa",
            borderRadius: "8px",
            border: "1px solid #eee",
            color: "#444",
            fontSize: "0.95rem",
            lineHeight: "2.0",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 6,   
            textOverflow: "ellipsis",
            wordBreak: "break-word",
            minHeight: "215px",   
            maxHeight: "120px",   
          }}
        >
          {post.description && post.description.trim() !== ""
            ? post.description
            : "No description provided."}
        </div>
      </div>

      {/* Bottom section (actions) */}
      <div>{children}</div>
    </div>
  );
}
