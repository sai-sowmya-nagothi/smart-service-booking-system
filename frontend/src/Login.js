import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login/", {
        username,
        password
      });

      localStorage.setItem("token", res.data.access);
      navigate("/dashboard");
    } catch {
      alert("Login failed");
    }
  };

  return (
  <div className="container">
    <div className="card">
      <h2>Login</h2>

      <input
        placeholder="Username"
        onChange={e => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>

<p style={{marginTop:"10px"}}>
  Don't have account?
  <span 
    style={{cursor:"pointer", marginLeft:"5px"}}
    onClick={() => navigate("/signup")}
  >
    Signup
  </span>
</p>

    </div>
  </div>
);
}