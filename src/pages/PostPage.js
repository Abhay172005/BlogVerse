import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { FaThumbsUp, FaThumbsDown, FaCommentAlt, FaTrash } from "react-icons/fa";
import EditPost from "../components/EditPost";

export default function PostPage({ user, refreshPosts }) {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState({ likes: 0, dislikes: 0, user: null });
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  
  const [isEditing, setIsEditing] = useState(false);

  
  const fetchPost = async () => {
    const { data } = await supabase.from("posts").select("*").eq("id", id).single();
    setPost(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  
  const fetchLikes = async () => {
    const { data } = await supabase.from("post_likes").select("*").eq("post_id", id);
    const obj = { likes: 0, dislikes: 0, user: null };
    (data || []).forEach((r) => {
      if (r.is_like) obj.likes++;
      else obj.dislikes++;
      if (user && r.user_id === user.id) obj.user = r;
    });
    setLikes(obj);
  };

  useEffect(() => {
    fetchLikes();
  }, [id, user]);

  
  const fetchComments = async () => {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", id)
      .order("created_at", { ascending: true });
    setComments(data || []);
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  
  const toggleLike = async (is_like) => {
    if (!user) return alert("Login to react");
    await supabase.from("post_likes").upsert(
      { post_id: id, user_id: user.id, is_like },
      { onConflict: ["user_id", "post_id"] }
    );
    await fetchLikes();
    refreshPosts && refreshPosts();
  };

  
  const addComment = async () => {
    if (!user) return alert("Login to comment");
    if (!newComment.trim()) return;

    
    let username = "Anonymous";
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .single();
      username = profile?.username || "Anonymous";
    }

    await supabase.from("comments").insert({
      post_id: id,
      user_id: user.id,
      username, 
      content: newComment,
    });

    setNewComment("");
    fetchComments();
  };

  if (loading) return <p className="text-center">Loading post...</p>;
  if (!post) return <p className="text-center">Post not found.</p>;

  return (
    <div className="main" style={{ maxWidth: "850px", margin: "0 auto" }}>
      <article className="post-page">
        {/* Title + Meta */}
        <header className="post-header">
          <h1>{post.title}</h1>
          <div className="post-meta">
            <span>
              By <strong>{post.author_username || "Anonymous"}</strong>
            </span>
            <span>· {new Date(post.created_at).toLocaleDateString()}</span>
            {post.category && <span className="tag">{post.category}</span>}
          </div>
        </header>

        {/* Description */}
        {post.description && <p className="post-description">{post.description}</p>}

        {/* Main Content */}
        <section className="post-content">{post.content}</section>

        {/* Actions */}
        <div className="actions" style={{ marginTop: "20px" }}>
          <button
            className={`action-btn ${likes.user?.is_like === true ? "active" : ""}`}
            onClick={() => toggleLike(true)}
          >
            <FaThumbsUp /> {likes.likes}
          </button>
          <button
            className={`action-btn ${likes.user?.is_like === false ? "active" : ""}`}
            onClick={() => toggleLike(false)}
          >
            <FaThumbsDown /> {likes.dislikes}
          </button>
          <span className="action-btn">
            <FaCommentAlt /> {comments.length}
          </span>
        </div>

        {/* Author Controls */}
        {user && user.id === post.author_id && (
          <div className="actions">
            <EditPost
              post={post}
              refreshPosts={refreshPosts}
              refreshCurrentPost={fetchPost}
              onOpen={() => setIsEditing(true)}
              onClose={() => setIsEditing(false)}
            />
            {!isEditing && (
             <button
  className="action-btn danger"
  onClick={async () => {
    if (window.confirm("Delete this post?")) {
      const { error } = await supabase.from("posts").delete().eq("id", post.id);

      if (error) {
        console.error("Error deleting post:", error);
        alert("Failed to delete post.");
        return;
      }

      if (refreshPosts) await refreshPosts(); 
      window.location.href = "/";            
    }
  }}
>
  <FaTrash /> Delete
</button>
 

            )}
          </div>
        )}

        {/* Comments */}
        <section className="comments">
          <h3>Comments</h3>
          {comments.length === 0 && <p className="meta-small">No comments yet.</p>}
          {comments.map((c) => (
            <div key={c.id} className="comment-item">
              <strong>{c.username || "Anonymous"}</strong>
              <p>{c.content}</p>
            </div>
          ))}

          {user && (
            <div className="form" style={{ marginTop: "12px" }}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
              />
              <button className="btn" onClick={addComment}>
                Add Comment
              </button>
            </div>
          )}
        </section>
      </article>
    </div>
  );
}
