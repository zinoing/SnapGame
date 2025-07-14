import { loadGame } from "../core/load-game.js";
import { getNextGameIdx, getPreviousGameIdx } from "../user-state/gameOrder.js";
import { getLevel } from "../user-state/level.js";

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
  if (e.key === "ArrowUp") {
    await loadGame(getPreviousGameIdx(), 0);
  } else if (e.key === "ArrowDown") {
    await loadGame(getNextGameIdx(), 0);
  }
}

async function handleSwipeGesture() {
  const delta = touchStartY - touchEndY;

  if (Math.abs(delta) < 50) return;

  if (delta > 0) {
      await loadGame(getNextGameIdx(), 0);
  } else {
      await loadGame(getPreviousGameIdx(), 0);
  }
}
