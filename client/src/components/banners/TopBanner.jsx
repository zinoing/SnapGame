import React from "react";
import "./TopBanner.css";

function TopBanner({ onHeartClick, onProfileClick }) {
  return (
    <div className="top-banner">
      <img src="/logo/logo_all_white.svg" alt="Logo" className="logo-img" />

      <div className="top-banner-actions">
        <button className="icon-btn" onClick={onHeartClick}>
          <img src="/icons/game.svg" alt="Game" className="icon-img" />
        </button>
        <button className="icon-btn" onClick={onProfileClick}>
          <img src="/icons/profile.svg" alt="Profile" className="icon-img" />
        </button>
      </div>
    </div>
  );
}

export default TopBanner;
