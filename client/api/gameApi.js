const API_BASE = "http://localhost:3000/api/game";

export async function getGameInfo(gameId) {
  const res = await fetch(`${API_BASE}/${gameId}`);
  return res.json();
}
