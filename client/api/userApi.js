const API_BASE = "http://10.0.2.2:3000/api/user";

export async function getUserCoins(userId) {
  const res = await fetch(`${API_BASE}/${userId}/coins`);
  const data = await res.json();
  return data.coins; 
}

export async function updateUserCoins(userId, coinData) {
  console.log("Sending coin update request", userId, coinData);
  const res = await fetch(`${API_BASE}/${userId}/coins`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(coinData),
  });
  return res.json();
}
