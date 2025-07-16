let BASE_URL = "";

if (typeof window !== "undefined") {
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isLocalhost = location.hostname === "localhost" || location.hostname === "127.0.0.1";

  if (isAndroid) {
    BASE_URL = "http://10.0.2.2:3000/api/level";
  } else if (isLocalhost) {
    BASE_URL = "http://localhost:3000/api/level";
  }
} else {
  BASE_URL = "http://localhost:3000/api/level";
}

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

export async function getMissionDescription(gameId, levelIndex) {
  try {
    const res = await fetch(`${BASE_URL}/missionDescription`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameId, levelIndex }),
    });

    if (!res.ok) {
      console.error("Failed to get mission description:", res.statusText);
      return null;
    }

    const data = await res.json();
    return data.description;
  } catch (err) {
    console.error("Network error in getMissionDescription:", err);
    return null;
  }
}

