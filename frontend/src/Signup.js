import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/register/", {
        username,
        email,
        password
      });

      alert("✅ Registration Successful!");
      navigate("/");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Signup</h2>

        <input
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
        />

        <input
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button onClick={register}>Register</button>

        <p style={{marginTop:"10px"}}>
          Already have account? 
          <span 
            style={{cursor:"pointer", marginLeft:"5px"}}
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}