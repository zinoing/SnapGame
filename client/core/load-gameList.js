const GAME_LIST_URL = "https://snapgame.s3.ap-northeast-2.amazonaws.com/games/gameList.json";

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
  const res = await fetch(GAME_LIST_URL);
  const rawList = await res.json();

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