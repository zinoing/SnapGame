const GAME_LIST_URL = "https://snapgame.s3.ap-northeast-2.amazonaws.com/games/gameList.json";
let gameList = null;

export async function loadGameList() {
  if (gameList) return gameList;

  const res = await fetch(GAME_LIST_URL);
  const rawList = await res.json();

  gameList = rawList.map(game => {
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

  return gameList;
}


export function getGameList() {
  return gameList;
}