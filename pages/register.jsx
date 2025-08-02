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
    // TODO: Add API call to register user
    setMessage("Registration successful!");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a192f",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#2563eb",
            marginBottom: "1.5rem",
          }}
        >
          Register
        </h2>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ color: "#0a192f" }}>Username:</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "5px",
              border: "1px solid #2563eb",
              marginTop: "0.25rem",
            }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ color: "#0a192f" }}>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "5px",
              border: "1px solid #2563eb",
              marginTop: "0.25rem",
            }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ color: "#0a192f" }}>Password:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "5px",
              border: "1px solid #2563eb",
              marginTop: "0.25rem",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.75rem",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Register
        </button>
        {message && (
          <p
            style={{
              marginTop: "1rem",
              color: "green",
              textAlign: "center",
            }}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Register;