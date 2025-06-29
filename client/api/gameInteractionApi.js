const BASE_URL = "http://localhost:3000/api/interaction";

export async function likeGame(userId, gameId) {
  try {
    await fetch(`${BASE_URL}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, gameId }),
    });
  } catch (err) {
    console.error("Like 실패:", err);
  }
}

export async function unlikeGame(userId, gameId) {
  try {
    await fetch(`${BASE_URL}/unlike`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, gameId }),
    });
  } catch (err) {
    console.error("Unlike 실패:", err);
  }
}

export async function fetchLikedGames(userId) {
  const res = await fetch(`${BASE_URL}/${userId}/likes`);
  if (!res.ok) throw new Error("Failed to fetch likes");
  return res.json();
}
