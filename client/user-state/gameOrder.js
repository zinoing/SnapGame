let gameOrder = [];
let currentIndex = 0;

export function getCurrentGameIdx() {
  return currentIndex;
}

export function getGameOrderByIdx(index) {
  return gameOrder[index];
}

export function getGameOrder() {
  return gameOrder;
}

export function setGameOrder(orderArray) {
  gameOrder = [...orderArray];
  currentIndex = 0;
}

export function getNextGameIdx() {
  if (currentIndex >= gameOrder.length) return null;
  return gameOrder[++currentIndex];
}

export function resetOrder() {
  currentIndex = 0;
}

export function getCurrentGame() {
  return gameOrder[currentIndex] ?? null;
}
