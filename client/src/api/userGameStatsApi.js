import { resolveBaseUrl } from "./baseUrl.js";
import { apiFetch } from "./request.js";
import "../config.js";

const BASE_URL = resolveBaseUrl("userGameStats"); 

export async function getLikedGames(userId) {
  return apiFetch(`${BASE_URL}/like/${userId}`);
}

export async function getBookmarkedGames(userId) {
  return apiFetch(`${BASE_URL}/bookmark/${userId}`);
}

export async function getGameHistory(userId) {
  return apiFetch(`${BASE_URL}/history/${userId}`);
}

export async function deleteGameHistory(userId, gameId) {
  return apiFetch(`${BASE_URL}/history/${userId}/${gameId}`, {
    method: "DELETE",
  });
}

export async function getGameResult({ userId, gameId }) {
  return apiFetch(`${BASE_URL}/result/${userId}/${gameId}`);
}

export async function submitGameResult({ sessionId, userId, gameId, custom = null }) {
  return apiFetch(`${BASE_URL}/result}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionId,
      userId,
      gameId,
      custom
    })
  });
}