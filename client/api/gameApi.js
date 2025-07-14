let BASE_URL = "";

if (typeof window !== "undefined") {
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isLocalhost = location.hostname === "localhost" || location.hostname === "127.0.0.1";

  if (isAndroid) {
    BASE_URL = "http://10.0.2.2:3000/api/game";
  } else if (isLocalhost) {
    BASE_URL = "http://localhost:3000/api/game";
  }
} else {
  BASE_URL = "http://localhost:3000/api/game";
}

export async function getGameInfo(gameId) {
  const res = await fetch(`${BASE_URL}/${gameId}`);
  return res.json();
}

export async function getGameList() {
  const res = await fetch(`${BASE_URL}/list`);
  return res.json();
}
