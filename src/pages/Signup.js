import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

   
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } }, 
    });

    if (error) {
      alert(error.message);
      return;
    }

    const user = data?.user;

    
    if (user) {
      const { error: profileError } = await supabase.from("profiles").insert([
        { id: user.id, username },
      ]);

      if (profileError) {
        console.error("Profile insert error:", profileError.message);
      }
    }

    alert("Signup successful! Please check your email to confirm.");
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: 420, margin: "60px auto", padding: "0 20px" }}>
      <div className="card" style={{ padding: 20 }}>
        <h2>Signup</h2>
        <form className="form" onSubmit={submit}>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="btn" type="submit">
            Create account
          </button>
        </form>
      </div>
    </div>
  );
}
