import React, { useRef } from "react";
import "./GameContainer.css";

function GameContainer({ game }) {
  const iframeRef = useRef(null);

  if (!game) return null;

  return (
    <div className="game-wrapper">
      <div id="game-container" className="game-container">
        <iframe
          ref={iframeRef}
          id="iframe"
          title={game.title}
          src={game.entry_url}
          className="game-iframe"
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default GameContainer;
