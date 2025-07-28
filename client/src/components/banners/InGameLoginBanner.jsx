import React from "react";
import "./InGameLoginBanner.css";

function InGameLoginBanner({ onLogin, onClose }) {
  return (
    <div className="login-banner">
        <span className="login-message">Don't lose your progress!</span>
        <div className="login-actions">
            <button className="login-banner-btn" onClick={onLogin}>Login Now</button>
            <button className="close-banner-btn" onClick={onClose}>✕</button>
        </div>
    </div>
  );
}

export default InGameLoginBanner;
