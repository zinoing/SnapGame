let currentScore = 0;

export function getScore() {
  return currentScore;
}

export function setScore(score) {
  currentScore = score;
}

export function incrementScore(amount = 1) {
  currentScore += amount;
}

export function resetScore() {
  currentScore = 0;
}