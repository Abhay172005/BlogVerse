import React, { useState } from "react";
import PostForm from "./PostForm";

export default function EditPost({ post, refreshPosts, refreshCurrentPost, onOpen, onClose }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    onOpen?.();
  };

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  return (
    <>
      {!open && (
        <button className="action-btn edit" onClick={handleOpen}>
          ✏️ Edit
        </button>
      )}

      {open && (
        <div className="modal-backdrop">
          <div
            className="modal"
            style={{
              position: "relative",
              maxWidth: "800px",   
              minHeight: "600px",  
              padding: "24px",
            }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              style={{
                position: "absolute",
                top: "14px",
                right: "14px",
                background: "transparent",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                color: "#666",
              }}
              aria-label="Close"
            >
              ✖
            </button>

            <h2>Edit Post</h2>

            <PostForm
              existingPost={post}
              refreshPosts={refreshPosts}
              refreshCurrentPost={refreshCurrentPost}
              user={post?.user}
              onDone={handleClose}
            />
          </div>
        </div>
      )}
    </>
  );
}
