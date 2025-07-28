import { useEffect } from "react";
import { loadNextGame, loadPreviousGame, getCurrentGame } from "./useGameOrder";

export function useSwipeUI(onSwipe, currentStep) {
  useEffect(() => {
    let touchStartY = 0;

    const onTouchStart = (e) => {
      touchStartY = e.changedTouches[0].screenY;
    };

    const onTouchEnd = async (e) => {
      if (currentStep === "game") return;

      const touchEndY = e.changedTouches[0].screenY;
      const diff = touchStartY - touchEndY;

      if (Math.abs(diff) > 30) {

        if (diff > 0) {
          loadNextGame();
        } else {
          loadPreviousGame();
        }

        const game = getCurrentGame();
        onSwipe?.(game);
      }
    };

    const onKeyDown = async (e) => {
      if (currentStep === "game") return;

      if (e.key === "ArrowUp") {
        loadPreviousGame();
        const game = getCurrentGame();
        onSwipe?.(game);
      } else if (e.key === "ArrowDown") {
        loadNextGame();
        const game = getCurrentGame();
        onSwipe?.(game);
      }
    };

    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchend", onTouchEnd, { passive: true });
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onSwipe, currentStep]);
}
