import { getGameInfo } from "../api/gameApi.js";

const gameNameEl = document.getElementById("game-name");
const gameDescriptionEl = document.getElementById("game-description");
const gameBannerEl = document.getElementById("game-banner");
const playButton = document.getElementById("play-button");

async function initIntro(gameId) {
  try { 
    const game = await getGameInfo(gameId);

    gameNameEl.textContent = game.title;
    gameDescriptionEl.textContent = game.description;

    const overlay = document.createElement("div");
    Object.assign(overlay.style, {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      zIndex: "1",
      pointerEvents: "none"
    });

    gameBannerEl.style.position = "relative";
    gameBannerEl.appendChild(overlay);

    const imagePath = game.thumbnail_url;
    gameBannerEl.style.backgroundImage = `url('${imagePath}')`;
    gameBannerEl.style.backgroundSize = "cover";
    gameBannerEl.style.backgroundPosition = "center";

    playButton.onclick = async () => {
      if (window.parent !== window) {
        window.parent.postMessage({
          type: "REQUEST_PLAY",
          gameId: game.id, 
        }, "*");
      } else {
        console.warn("Not in iframe — staying on current page");
      }
    };
  } catch (err) {
    console.error("Intro load error:", err);
    alert("Failed to load game data.");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  window.parent.postMessage({ type: "INTRO_READY" }, "*");
});

window.addEventListener("message", async (event) => {
  try {
    const { type, gameId } = event.data;

    switch (type) {
      case "SHOW_INTRO":
        initIntro(gameId);
        break;

      case "SESSION_ERROR":
        // TODO: handle session error (show error message, etc.)
        console.error("Session error received from parent.");
        break;

      default:
        console.warn(`Unhandled message type: ${type}`);
        break;
    }
  } catch (err) {
    console.error("addEventListener error:", err);
  }
});