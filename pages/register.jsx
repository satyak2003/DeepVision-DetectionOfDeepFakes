import React, { useState } from "react";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add validation here if needed
    setMessage("Registration successful!");
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

        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
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
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
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
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
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

        {message && (
          <p className="mt-4 text-green-400 text-center text-sm font-medium">
            {message}
          </p>
        )}

        <p className="text-center text-gray-400 text-sm mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-500 hover:underline font-semibold"
          >
            Log in here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
