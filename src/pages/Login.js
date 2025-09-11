import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else navigate("/");
  };

  return (
    <div style={{ maxWidth:420, margin:"60px auto", padding:"0 20px" }}>
      <div className="card" style={{ padding:20 }}>
        <h2>Login</h2>
        <form className="form" onSubmit={submit}>
          <input type="email" placeholder="Email" required value={email} onChange={(e)=>setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required value={password} onChange={(e)=>setPassword(e.target.value)} />
          <button className="btn" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
