const BASE_URL = "http://10.0.2.2:3000/api/level";

export async function incrementLevelAttempt(gameId, levelIndex) {
  try {
    const res = await fetch(`${BASE_URL}/incrementLevelAttempt`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameId, levelIndex }),
    });

    if (!res.ok) {
      console.error("Failed to increment level attempt:", res.statusText);
    }
  } catch (err) {
    console.error("Network error in incrementLevelAttempt:", err);
  }
}

export async function incrementLevelSuccess(gameId, levelIndex) {
  try {
    const res = await fetch(`${BASE_URL}/incrementLevelSuccess`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameId, levelIndex }),
    });

    if (!res.ok) {
      console.error("Failed to increment level success:", res.statusText);
    }
  } catch (err) {
    console.error("Network error in incrementLevelSuccess:", err);
  }
}
