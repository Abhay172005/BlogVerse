import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Header({ user }) {
  const navigate = useNavigate();

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <header className="header">
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Brand Section */}
        <div className="brand" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => navigate("/")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "inherit",
              fontSize: "1.2rem",
              fontWeight: "700",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "1rem",
              }}
            >
              BV
            </div>
            
          </button>
        </div>

        {/* Navigation */}
        <nav className="nav" style={{ display: "flex", gap: 12 }}>
          <button onClick={() => navigate("/")}>Home</button>

          {user ? (
            <>
              <button onClick={() => navigate("/create")}>Create</button>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/login")}>Login</button>
              <button onClick={() => navigate("/signup")}>Signup</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
