import React, { useState } from "react";
import "./Signup.css";
import loginbg from '../assets/loginbg.jpg';
import googleLogo from '../assets/google logo.svg'; // adjust if your path differs

const Signup = ({ gotoLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: name,
        email,
        password,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Signup successful! Please login.");
      gotoLogin();
    } else {
      alert(data.error);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/google-signup";
  };

  return (
    <div
      className="login-bg"
      style={{
        backgroundImage: `url(${loginbg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        minHeight: '100vh'
      }}
    >
      <div className="login-card">
        <div className="login-logo">
          <span role="img" aria-label="logo">🌙</span>
        </div>
        <h2>Create Your Account</h2>
        <p className="login-sublabel">
          Already have an account? <span className="login-link" onClick={gotoLogin}>Login Here!</span>
        </p>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">
            Signup
          </button>
        </form>
        <div className="or-divider">OR</div>
        <div className="login-socials">
          <button className="google-btn" onClick={handleGoogleLogin}>
            <img
              src={googleLogo}
              alt="Google"
              className="google-icon"
            />
            Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
