import { loadGameAsync } from "../core/load-game.js";
import { getCurrentGame, loadNextGame, loadPreviousGame } from "../user-state/gameOrder.js";
import { startGame, submitGameResult } from "../api/gameApi.js";
import { setPlaying } from "../user-state/gameState.js";

let sessionId = null;

export async function handleGameMessage(event) {
  const { type, gameId, custom } = event.data;
  const iframe = document.getElementById("iframe");

  switch (type) {
    case "REQUEST_GAME_STATE":
      iframe?.contentWindow?.postMessage(
        { type: "INIT_GAME_STATE" },
        "*"
      );
      break;

    case "INTRO_READY":
      iframe?.contentWindow?.postMessage(
        { 
          type: "SHOW_INTRO",
          gameId: getCurrentGame().id
        },
        "*"
      );
      break;

    case "REQUEST_PLAY":
      try {
        const response = await startGame(gameId);
        sessionId = response.sessionId;
        sessionStorage.setItem("sessionId", sessionId);
        
        setPlaying(true);

        await loadGameAsync(getCurrentGame(), false);
      } catch (error) {
        console.error("Failed to start game session:", error);
        iframe?.contentWindow?.postMessage(
          {
            type: "SESSION_ERROR",
            message: "Failed to start game session."
          },
          "*"
        );
      }
      break;

    case "DONE":
      try {
        const resultSessionId = event.data.sessionId || sessionId || sessionStorage.getItem("sessionId");

        if (!resultSessionId || !gameId) {
          console.error("Missing data for submitting game result.");
          return;
        }

        await submitGameResult({
          sessionId: resultSessionId,
          gameId,
          custom
        });

        await loadGameAsync(loadNextGame(), true);
      } catch (error) {
        console.error("Error submitting game result:", error);
        iframe?.contentWindow?.postMessage(
          {
            type: "RESULT_ERROR",
            message: "An error occurred while submitting game result."
          },
          "*"
        );
      }
      break;
  }
}
