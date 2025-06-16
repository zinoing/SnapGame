const API_BASE = "/api/game";

export async function getGameInfo(gameId) {
  const res = await fetch(`${API_BASE}/${gameId}`);
  return res.json();
}
