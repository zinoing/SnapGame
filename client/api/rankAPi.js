let BASE_URL = "http://localhost:3000/api/rank";

if (typeof window !== "undefined") {
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isLocalhost = location.hostname === "localhost" || location.hostname === "127.0.0.1";

  if (isAndroid) {
    BASE_URL = "http://10.0.2.2:3000/api/rank";
  } else if (isLocalhost) {
    BASE_URL = "http://localhost:3000/api/rank";
  }
}

export async function getTotalCoinRanking() {
  try {
    const res = await fetch(`${BASE_URL}/coin`);
    if (!res.ok) throw new Error("Failed to load total coin ranking");

    return await res.json(); 
  } catch (err) {
    console.error("Error fetching total ranking:", err);
    return [];
  }
}

export async function getUserCoinRank(userId) {
  try {
    const res = await fetch(`${BASE_URL}/coin/${userId}`);
    if (!res.ok) throw new Error("Failed to load user coin rank");

    return await res.json();
  } catch (err) {
    console.error("Error fetching user rank:", err);
    return null;
  }
}
