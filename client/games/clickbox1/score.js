const SCORE_KEY = "SnapGameScore";

function ensureParentStorage() {
  if (!window.parent[SCORE_KEY]) {
    window.parent[SCORE_KEY] = 0;
  }
}

export function getScore() {
  ensureParentStorage();
  return window.parent[SCORE_KEY];
}

export function setScore(newValue) {
  window.parent[SCORE_KEY] = newValue;
}

export function incrementScore(amount = 1) {
  ensureParentStorage();
  window.parent[SCORE_KEY] += amount;
}
