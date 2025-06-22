let currentLevel = 0;

export function getLevel() {
  return currentLevel;
}

export function setLevel(level) {
  currentLevel = level;
}

export function incrementLevel() {
  currentLevel++;
}

export function resetLevel() {
  currentLevel = 0;
}