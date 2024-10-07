"use client";

import { useState } from "react";
import api from "../../utils/axiosInstance";
import { saveTokens } from "../../services/tokenService";
import { redirect } from "next/navigation";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/api/token/", { username, password });
      saveTokens(response.data.access, response.data.refresh);
      redirect("/");
    } catch (err) {
      setError(
        err.response
          ? err.response.data.detail
          : "Login failed. Please try again."
      );
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default LoginPage;
