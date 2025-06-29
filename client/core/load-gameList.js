import { getGameList } from "../api/gameApi.js"

let gameManifestList = null;

export async function initializeGameOrder() {
  gameManifestList = await loadGameManifestList();
  console.log("🎮 Loaded game list:", gameManifestList);

  let gameOrder = Array.from({ length: gameManifestList.length }, (_, i) => i);
  shuffle();
  return gameOrder;
}

function shuffle(gameOrder = []) {
  for (let i = gameOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [gameOrder[i], gameOrder[j]] = [gameOrder[j], gameOrder[i]];
  }
}

export async function loadGameManifestList() {
  const rawList = await getGameList();

  const gameManifestList = rawList.map(game => {
    const levels = [];

    levels.push(`games/${game.gameId}/intro/intro.html`);
    for (let i = 1; i <= game.levels; i++) {
      levels.push(`games/${game.gameId}/level${i}/index.html`);
    }

    return {
      ...game,
      levels
    };
  });

  return gameManifestList;
}

export function getGameManifestList() {
  return gameManifestList;
}