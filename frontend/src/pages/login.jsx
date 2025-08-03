// src/pages/login.jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // redirect on successful login
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 px-4">
      <div className="w-full max-w-md bg-slate-800 rounded-3xl shadow-lg p-8 space-y-6">
        <h2 className="text-center text-3xl font-extrabold text-white tracking-wide">
          Log In to DeepVision
        </h2>

        {error && (
          <div className="rounded-md bg-red-100 border border-red-400 text-red-700 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-md bg-slate-700 border border-gray-600 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full rounded-md bg-slate-700 border border-gray-600 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 rounded-md py-3 text-white font-semibold transition duration-300"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline font-semibold">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
