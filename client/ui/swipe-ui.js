import { loadGame } from "../core/load-game.js";
import { getNextGameIdx, getPreviousGameIdx } from "../user-state/gameOrder.js";
import { getLevel, setLevel } from "../user-state/level.js";

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
  setLevel(0);

  if (e.key === "ArrowUp") {
    await loadGame(getPreviousGameIdx(), getLevel());
  } else if (e.key === "ArrowDown") {
    await loadGame(getNextGameIdx(), getLevel());
  }
}

async function handleSwipeGesture() {
  setLevel(0);

  const delta = touchStartY - touchEndY;

  if (Math.abs(delta) < 50) return;

  if (delta > 0) {
      await loadGame(getNextGameIdx(), getLevel());
  } else {
      await loadGame(getPreviousGameIdx(), getLevel());
  }
}
