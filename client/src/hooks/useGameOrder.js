let gameOrder = [];
let currentIndex = 0;

export function getCurrentGameIdx() {
  return currentIndex;
}

export function getGameByIdx(index) {
  return gameOrder[index];
}

export function getGameOrder() {
  return gameOrder;
}

export function setGameOrder(orderArray) {
  gameOrder = [...orderArray];
}

export function getNextGame() {
  if (gameOrder.length === 0) return null;
  const nextIdx = (currentIndex + 1) % gameOrder.length;
  return gameOrder[nextIdx];
}

export function getPreviousGame() {
  if (gameOrder.length === 0) return null;
  const prevIdx = (currentIndex - 1 + gameOrder.length) % gameOrder.length;
  return gameOrder[prevIdx];
}

export function loadNextGame() {
  currentIndex = (currentIndex + 1) % gameOrder.length;
  return gameOrder[currentIndex];
}

export function loadPreviousGame() {
  currentIndex = (currentIndex - 1 + gameOrder.length) % gameOrder.length;
  return gameOrder[currentIndex];
}

export function resetOrder() {
  currentIndex = 0;
}

export function getCurrentGame() {
  return gameOrder[currentIndex] ?? null;
}
