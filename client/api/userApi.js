let BASE_URL = "";

if (typeof window !== "undefined") {
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isLocalhost = location.hostname === "localhost" || location.hostname === "127.0.0.1";

  if (isAndroid) {
    BASE_URL = "http://10.0.2.2:3000/api/user";
  } else if (isLocalhost) {
    BASE_URL = "http://localhost:3000/api/user";
  }
} else {
  BASE_URL = "http://localhost:3000/api/user";
}

export async function getUserCoins(userId) {
  const res = await fetch(`${BASE_URL}/${userId}/coins`);
  const data = await res.json();
  return data.coins; 
}

export async function updateUserCoins(userId, coinData) {
  console.log("Sending coin update request", userId, coinData);
  const res = await fetch(`${BASE_URL}/${userId}/coins`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(coinData),
  });
  return res.json();
}
