import { loadNextGame, loadPreviousGame } from "../load-game.js";

let touchStartY = 0;
let touchEndY = 0;

export function initSwipeUI() {
  ["swipe-top", "swipe-bottom"].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
  });
}

function onTouchStart(e) {
  touchStartY = e.changedTouches[0].screenY;
}

function onTouchEnd(e) {
  touchEndY = e.changedTouches[0].screenY;
  handleSwipeGesture();
}

function handleSwipeGesture() {
  const delta = touchStartY - touchEndY;

  if (Math.abs(delta) < 50) return; // 너무 작은 스와이프 무시

  if (delta > 0) {
    loadNextGame();
  } else {
    loadPreviousGame();
  }
}
