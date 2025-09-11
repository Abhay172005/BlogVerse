import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import PostCard from "./PostCard";
import { FaThumbsUp, FaComment, FaTag } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function PostList({ posts, search, category }) {
  const [likes, setLikes] = useState({});
  const [commentsCount, setCommentsCount] = useState({});

  // Load likes & comments
  useEffect(() => {
    const fetchLikes = async () => {
      const { data } = await supabase.from("post_likes").select("*");
      const obj = {};
      (data || []).forEach((r) => {
        if (!obj[r.post_id]) obj[r.post_id] = { likes: 0 };
        if (r.is_like) obj[r.post_id].likes++;
      });
      setLikes(obj);
    };

    const fetchCommentsCount = async () => {
      const { data } = await supabase.from("comments").select("post_id");
      const obj = {};
      (data || []).forEach((c) => {
        obj[c.post_id] = (obj[c.post_id] || 0) + 1;
      });
      setCommentsCount(obj);
    };

    fetchLikes();
    fetchCommentsCount();
  }, [posts]);

  const filtered = (posts || []).filter(
    (p) =>
      p.title.toLowerCase().includes((search || "").toLowerCase()) &&
      ((category || "") === "" ||
        (p.category || "").toLowerCase() === (category || "").toLowerCase())
  );

  return (
    <div className="grid" style={{ marginBottom: 18 }}>
      {filtered.map((post) => (
        <div key={post.id}>
          <PostCard post={post}>
            <div className="actions">
              {/* Like count */}
              <span className="action-btn" style={{ cursor: "default" }}>
                <FaThumbsUp /> {likes[post.id]?.likes || 0}
              </span>

              {/* Comment count */}
              <span className="action-btn" style={{ cursor: "default" }}>
                <FaComment /> {commentsCount[post.id] || 0}
              </span>

              {/* Category tag */}
              {post.category && (
                <span className="action-btn" style={{ cursor: "default" }}>
                  <FaTag /> {post.category}
                </span>
              )}

              {/* Read More */}
              <Link to={`/post/${post.id}`} className="action-btn">
                Read More
              </Link>
            </div>
          </PostCard>
        </div>
      ))}
    </div>
  );
}
