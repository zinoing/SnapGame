import React from "react";
import "./LoginPanel.css";

function LoginPanel({ onClose }) {
  return (
    <div className="login-modal">
      <div className="login-container">
        <button className="close-panel-btn" onClick={onClose}>✕</button>
        <h2>Log In or Sign Up</h2>

        <button className="login-panel-btn google">Continue with Google</button>
        <button className="login-panel-btn facebook">Continue with Facebook</button>
        <button className="login-panel-btn apple">Continue with Apple</button>

        <div className="separator">or</div>

        <input className="email-input" type="email" placeholder="Enter your email" />
        <button className="continue-login-btn" disabled>Continue</button>

        <button className="inquiry-btn">Contact Us</button>

        <select className="language-select">
          <option>English</option>
          <option>Korean</option>
        </select>
      </div>
    </div>
  );
}

export default LoginPanel;
