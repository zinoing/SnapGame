const BASE_URL = "http://10.0.2.2:3000/api/game";

export async function getGameInfo(gameId) {
  const res = await fetch(`${BASE_URL}/${gameId}`);
  return res.json();
}

export async function getGameList() {
  const res = await fetch(`${BASE_URL}/list`);
  return res.json();
}
