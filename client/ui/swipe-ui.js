import { loadGameAsync } from "../core/load-game.js";
import { getCurrentGame, loadNextGame, loadPreviousGame } from "../user-state/gameOrder.js";
import { getIsPlaying, setPlaying } from "../user-state/gameState.js";
import { endGame } from "../api/gameApi.js";

let touchStartY = 0;
let touchEndY = 0;

export function initSwipeUI() {
  ["swipe-top", "swipe-bottom"].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
  });

  document.addEventListener("keydown", onKeyDown);
}

function onTouchStart(e) {
  touchStartY = e.changedTouches[0].screenY;
}

async function onTouchEnd(e) {
  touchEndY = e.changedTouches[0].screenY;
  await handleSwipeGesture();
}

async function onKeyDown(e) {
  if(getIsPlaying()) {
    setPlaying(false);
    await endGame(sessionStorage.getItem("sessionId"));
  }

  if (e.key === "ArrowUp") {
    await loadGameAsync(loadPreviousGame(), true);
  } else if (e.key === "ArrowDown") {
    await loadGameAsync(loadNextGame(), true);
  }
}

async function handleSwipeGesture() {
  const delta = touchStartY - touchEndY;

  if (Math.abs(delta) < 50) return;

  if (delta > 0) {
      if(getIsPlaying()) {
        setPlaying(false);
        await endGame(getCurrentGame().id);
      }

      await loadGameAsync(loadNextGame(), true);
  } else {
      await loadGameAsync(loadPreviousGame(), true);
  }
}
