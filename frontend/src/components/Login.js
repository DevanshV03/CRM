import React, { useState } from "react";
import "./Login.css"; // We'll create this in the next step
import loginbg from "../assets/loginbg.jpg"
import googleLogo from "../assets/google logo.svg"

const Login = ({gotoSignup}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await res.json();
  if (res.ok) {
    alert("Login successful!");
    // Proceed to your app page or set authenticated state
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
        <h2>Welcome Back</h2>
        <p className="login-sublabel">
          Don't have an account yet? <span className="login-link" onClick={gotoSignup}>Sign up</span>
        </p>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="email address"
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
            Login
          </button>
        </form>
        <div className="or-divider">OR</div>
        <div className="login-socials">
          <button className="google-btn" onClick={handleGoogleLogin}>
            {/* You can use an icon here instead of text */}
            <img
              src={googleLogo}
              alt="G"
              className="google-icon"
            />
            Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
