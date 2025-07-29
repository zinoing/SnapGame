import { useEffect } from "react";
import {
  getCurrentGame,
  loadNextGame,
  loadPreviousGame,
} from "../hooks/useGameOrder";
import { startGame } from "../api/gameApi";
import { getUserInfo } from "../api/userApi";
import { submitGameResult } from "../api/userGameStatsApi";

export function useIframeMessageHandler(setStep) {
  useEffect(() => {
    const handleMessage = async (event) => {
      const { type, allowedOrigin, gameId, custom, message } = event.data || {};
      const iframe = document.getElementById("iframe");

      switch (type) {
        case "REQUEST_GAME_STATE":
          let custom = null;

          if(!window.USER_CONFIG.IS_GUEST) {
            const user = await getUserInfo(window.USER_CONFIG.USER_ID);
            custom = user.custom;
          }

          iframe?.contentWindow?.postMessage(
            { 
              type: "INIT_GAME_STATE",
              custom: custom
            },
            "*"
          );

          const response = await startGame(gameId);
          const sessionId = response.sessionId;
          sessionStorage.setItem("sessionId", sessionId);
          break;

        case "DONE":
          try {
            const sessionId = sessionStorage.getItem("sessionId");
            const userId = window.USER_CONFIG.USER_ID;

            if (!sessionId || !gameId) {
              console.error("Missing sessionId or gameId in DONE event");
              return;
            }

            await submitGameResult({
              sessionId,
              userId,
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