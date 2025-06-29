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
  currentIndex = (currentIndex + 1) % gameOrder.length;
  return gameOrder[currentIndex];
}

export function getPreviousGameIdx() {
  currentIndex = (currentIndex - 1 + gameOrder.length) % gameOrder.length;
  return gameOrder[currentIndex];
}

export function resetOrder() {
  currentIndex = 0;
}

export function getCurrentGame() {
  return gameOrder[currentIndex] ?? null;
}
