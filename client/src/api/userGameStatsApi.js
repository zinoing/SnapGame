import { resolveBaseUrl } from "./baseUrl.js";
import { apiFetch } from "./request.js";
import "../config.js";

const BASE_URL = resolveBaseUrl("userGameStats"); 

export async function getLikedGames() {
  return apiFetch(`${BASE_URL}/like/${window.USER_CONFIG.USER_ID}`);
}

export async function getBookmarkedGames() {
  return apiFetch(`${BASE_URL}/bookmark/${window.USER_CONFIG.USER_ID}`);
}

export async function getGameHistory() {
  return apiFetch(`${BASE_URL}/history/${window.USER_CONFIG.USER_ID}`);
}
