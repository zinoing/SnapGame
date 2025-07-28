import React from "react";
import "./InGameTopBanner.css";

function InGameTopBanner({ onExit }) {
  return (
    <div className="in-game-top-banner">
      <button className="exit-btn" onClick={onExit}>Exit</button>
    </div>
  );
}

export default InGameTopBanner;
