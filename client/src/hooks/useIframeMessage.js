import { useEffect } from "react";
import {
  getCurrentGame,
  loadNextGame,
  loadPreviousGame,
} from "../hooks/useGameOrder";
import { startGame, submitGameResult } from "../api/gameApi";

export function useIframeMessageHandler(setStep) {
  useEffect(() => {
    const handleMessage = async (event) => {
      const { type, allowedOrigin, gameId, custom, message } = event.data || {};
      const iframe = document.getElementById("iframe");

      switch (type) {
        case "REQUEST_GAME_STATE":
          iframe?.contentWindow?.postMessage(
            { type: "INIT_GAME_STATE",
              gameId: getCurrentGame().id,
             },
            "*"
          );

          const response = await startGame(getCurrentGame().id);
          const sessionId = response.sessionId;
          sessionStorage.setItem("sessionId", sessionId);
          break;

        case "DONE":
          try {
            const sessionId = sessionStorage.getItem("sessionId");

            if (!sessionId || !gameId) {
              console.error("Missing sessionId or gameId in DONE event");
              return;
            }

            await submitGameResult({
              sessionId,
              gameId,
              custom,
            });

            loadNextGame();
            setStep("intro");
          } catch (error) {
            console.error("Error submitting game result:", error);
            iframe?.contentWindow?.postMessage(
              {
                type: "RESULT_ERROR",
                message: "An error occurred while submitting game result.",
              },
              "*"
            );
          }
          break;

        default:
          console.log("fail to listen meaningful thing");
          break;
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);
}