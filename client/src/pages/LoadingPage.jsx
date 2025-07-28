import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initializeGameOrder } from "../core/load-game-list";
import { getCurrentGame, setGameOrder } from "../hooks/useGameOrder";

function LoadingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      const start = Date.now();

      const gameOrder = await initializeGameOrder();
      setGameOrder(gameOrder);
      const game = getCurrentGame();

      const elapsed = Date.now() - start;
      const delay = Math.max(0, 2000 - elapsed);

      setTimeout(() => {
        if (game) {
          navigate("/game-feed", { state: { game } });
        } else {
          navigate("/game-feed");
        }
      }, delay);
    };

    init();
  }, [navigate]);

  return (
    <div className="loading-page">
      <div className="loading-wrapper">
        <img src="/logo/logo.svg" alt="Logo" className="loading-logo" />
      </div>
    </div>
  );
}

export default LoadingPage;
