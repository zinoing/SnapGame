let BASE_URL = "";

if (typeof window !== "undefined") {
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isLocalhost = location.hostname === "localhost" || location.hostname === "127.0.0.1";

  if (isAndroid) {
    BASE_URL = "http://10.0.2.2:3000/api/interaction";
  } else if (isLocalhost) {
    BASE_URL = "http://localhost:3000/api/interaction";
  }
} else {
  BASE_URL = "http://localhost:3000/api/interaction";
}

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
