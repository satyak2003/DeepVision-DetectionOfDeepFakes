// src/pages/register.jsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      // Update user profile with username
      await updateProfile(userCredential.user, {
        displayName: form.username,
      });

      setMessage("Registration successful! You can now log in.");
      setForm({ username: "", email: "", password: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mt-10 bg-slate-800 rounded-3xl shadow-lg p-8 space-y-6"
      >
        <h2 className="text-center text-3xl font-extrabold text-white tracking-wide">
          Create your account
        </h2>

        {error && (
          <div className="rounded-md bg-red-100 border border-red-400 text-red-700 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {message && (
          <div className="rounded-md bg-green-100 border border-green-400 text-green-700 px-4 py-3 text-sm">
            {message}
          </div>
        )}

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            required
            placeholder="Enter your username"
            className="w-full rounded-md bg-slate-700 border border-gray-600 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
            className="w-full rounded-md bg-slate-700 border border-gray-600 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
            className="w-full rounded-md bg-slate-700 border border-gray-600 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 rounded-md py-3 text-white font-semibold transition duration-300"
        >
          Register
        </button>

        <p className="text-center text-gray-400 text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline font-semibold">
            Log in here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
