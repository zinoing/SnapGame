import { resolveBaseUrl } from "./baseUrl.js";
import { apiFetch } from "./request.js";

const BASE_URL = resolveBaseUrl("games");

export async function getGameInfo(gameId) {
  return apiFetch(`${BASE_URL}/${gameId}`);
}

export async function getGameList() {
  return apiFetch(`${BASE_URL}/list`);
}

export async function startGame(gameId) {
  return apiFetch(`${BASE_URL}/start/${window.USER_CONFIG.USER_ID}/${gameId}`, {
    method: "POST"
  });
}

export async function endGame(sessionId) {
  return apiFetch(`${BASE_URL}/end/${sessionId}`, {
    method: "POST"
  });
}
