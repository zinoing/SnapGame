import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useIframeMessageHandler } from "../hooks/useIframeMessage";
import {
  getCurrentGame,
  getNextGame,
  getPreviousGame,
  loadNextGame,
  loadPreviousGame,
} from "../hooks/useGameOrder";
import GameContainer from "../components/game/GameContainer";
import InteractionIcons from "../components/common/InteractionIcons";
import TopBanner from "../components/banners/TopBanner";
import MyPanel from "../components/panels/MyPanel";
import InGameTopBanner from "../components/banners/InGameTopBanner";
import InGameLoginBanner from "../components/banners/InGameLoginBanner";
import LoginPanel from "../components/panels/LoginPanel";
import GameSwiper from "../components/common/GameSwiper";
import { endGame } from "../api/gameApi";

function getGameState() {
  return {
    prev: getPreviousGame(), 
    current: getCurrentGame(),
    next: getNextGame(),
  };
}

function GameFeedPage() {
  const location = useLocation();
  const initialGame = location.state?.game || getCurrentGame();

  const [step, setStep] = useState("intro");
  const [showMyPanel, setShowMyGamePanel] = useState(false);
  const [showLoginBanner, setShowLoginBanner] = useState(true);
  const [showLoginPanel, setShowLoginPanel] = useState(false);

  const [memoizedGame, setMemoizedGame] = useState(initialGame);
  const [gameState, setGameState] = useState(getGameState());

  const handleSwipe = (dir) => {
    if (dir === "up") loadNextGame();
    else loadPreviousGame();

    const updated = getGameState();
    setGameState(updated); 
  };

  useIframeMessageHandler(setStep);

  return (
    <div className="game-feed-page">
      {step === "intro" && (
        <>
          <TopBanner
            onHeartClick={() => setShowMyGamePanel(true)}
            onProfileClick={() => setShowLoginPanel(true)}
          />

          <MyPanel
            visible={showMyPanel}
            onClose={() => setShowMyGamePanel(false)}
            onSelectGame={(game) => {
              setMemoizedGame(game);
              setStep("play");
            }}
          />

          {showLoginPanel && (
            <LoginPanel 
              onClose={() => setShowLoginPanel(false)} 
            />
          )}

          <GameSwiper
            gameState={gameState}
            onSwipe={handleSwipe}
          />
        </>
      )}

      {step === "play" && (
        <>
          <InGameTopBanner onExit={async () => {
            setStep("intro");
            const sessionId = sessionStorage.getItem("sessionId");
            await endGame(sessionId);
            }} />
          {showLoginBanner && (
            <InGameLoginBanner
              onLogin={() => {
                setStep("intro");
                setShowLoginPanel(true);
              }}
              onClose={() => setShowLoginBanner(false)}
            />
          )}
          <GameContainer game={memoizedGame} />
        </>
      )}
    </div>
  );
}

export default GameFeedPage;
