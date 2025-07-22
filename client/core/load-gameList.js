import { getGameList } from "../api/gameApi.js";

let gameInfoList = null;

export async function initializeGameOrder() {
  gameInfoList = await getGameList();
  console.log("🎮 Loaded game list (before shuffle):", gameInfoList);

  shuffleArray(gameInfoList);

  const gameOrder = gameInfoList;
  return gameOrder;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
