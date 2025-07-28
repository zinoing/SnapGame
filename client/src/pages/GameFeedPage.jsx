import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSwipeUI } from "../hooks/useSwipeUI";
import { useIframeMessageHandler } from "../hooks/useIframeMessage";
import { getCurrentGame } from "../hooks/useGameOrder";
import GameContainer from "../components/game/GameContainer";
import InteractionIcons from "../components/common/InteractionIcons";
import TopBanner from "../components/banners/TopBanner";
import MyPanel from "../components/panels/MyPanel";
import InGameTopBanner from "../components/banners/InGameTopBanner";
import InGameLoginBanner from "../components/banners/InGameLoginBanner";
import LoginPanel from "../components/panels/LoginPanel";
import { endGame } from "../api/gameApi";

function GameFeedPage() {
  const location = useLocation();
  const initialGame = location.state?.game || getCurrentGame();

  const [step, setStep] = useState("intro");
  const [memoizedGame, setMemoizedGame] = useState(initialGame);
  const [showMyPanel, setShowMyGamePanel] = useState(false);
  const [showLoginBanner, setShowLoginBanner] = useState(true);
  const [showLoginPanel, setShowLoginPanel] = useState(false);

  useSwipeUI((game) => {
    setMemoizedGame(game);
    setStep("intro");
  }, step);

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
          />

          {showLoginPanel && (
            <LoginPanel 
              onClose={() => setShowLoginPanel(false)} 
            />
          )}

          <div className="intro-page">
            <div
              className="game-banner"
              style={{ backgroundImage: `url(${memoizedGame.thumbnail_url})` }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              />
              <div className="game-info" style={{ position: "relative" }}>
                <h1 id="game-name">{memoizedGame.title}</h1>
                <p id="game-description">{memoizedGame.description}</p>
                <InteractionIcons
                  userId={window.USER_CONFIG?.USER_ID}
                  gameId={memoizedGame.id}
                />
                <button id="play-button" onClick={() => setStep("play")}>
                  ▶ Play
                </button>
              </div>
            </div>
          </div>
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
