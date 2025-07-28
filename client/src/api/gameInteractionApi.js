import { resolveBaseUrl } from "./baseUrl.js";
import { apiFetch } from "./request.js";

const BASE_URL = resolveBaseUrl("interactions");

export async function likeGame(userId, gameId) {
  return apiFetch(`${BASE_URL}/like`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, gameId }),
  });
}

export async function unlikeGame(userId, gameId) {
  return apiFetch(`${BASE_URL}/users/${userId}/games/${gameId}/like`, {
    method: "DELETE"
  });
}

export async function getLikedGames(userId) {
  const res = await fetch(`${BASE_URL}/user/${userId}/likes`);
  if (!res.ok) throw new Error("Failed to fetch likes");
  return res.json();
}

export async function bookmarkGame(userId, gameId) {
  return apiFetch(`${BASE_URL}/bookmark`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, gameId }),
  });
}

export async function unbookmarkGame(userId, gameId) {
  return apiFetch(`${BASE_URL}/users/${userId}/games/${gameId}/bookmark`, {
    method: "DELETE"
  });
}

export async function getBookmarkedGames(userId) {
  const res = await fetch(`${BASE_URL}/user/${userId}/bookmarks`);
  if (!res.ok) throw new Error("Failed to fetch bookmarks");
  return res.json();
}
