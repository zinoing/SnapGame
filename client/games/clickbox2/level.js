const LEVEL_KEY = "SnapGameLevel";

function ensureParentLevelStorage() {
  if (typeof window.parent[LEVEL_KEY] !== "number") {
    window.parent[LEVEL_KEY] = 1;
  }
}

export function getCurrentLevel() {
  ensureParentLevelStorage();
  return window.parent[LEVEL_KEY];
}

export function setCurrentLevel(val) {
  window.parent[LEVEL_KEY] = val;
}

export function incrementLevel() {
  ensureParentLevelStorage();
  window.parent[LEVEL_KEY]++;
}

export function getLevelChecker() {
const currentLevel = getCurrentLevel();

switch (currentLevel) {
  case 1:
    return {
      succeed: ({ score }) => score === 5,
    };
  case 2:
    return {
      succeed: ({ score }) => score === 10,
    };
  case 3:
    return {
      succeed: ({ score }) => score === 15,
    };
  }
}