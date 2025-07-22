import { resolveBaseUrl } from "./baseUrl.js";
import { apiFetch } from "./request.js";

const BASE_URL = resolveBaseUrl("user");

export async function getUser(userId) {
  return apiFetch(`${BASE_URL}/${userId}`);
}

export async function createUser(data) {
  return apiFetch(`${BASE_URL}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
