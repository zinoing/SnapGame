import { resolveBaseUrl } from "./baseUrl.js";
import { apiFetch } from "./request.js";
import { v4 as uuidv4 } from "uuid";

const BASE_URL = resolveBaseUrl("users");

export async function createUser(username, email, passwordHash, isGuest = false, expiresAt = null) {
  const payload = {
    username,
    email,
    passwordHash,
    isGuest,
    expiresAt,
  };

  return apiFetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function createGuestUser() {
  const guestName = `Guest-${uuidv4().slice(0, 8)}`;
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const res = await createUser(
    guestName,
    null,
    null,
    true,
    expiresAt.toISOString().slice(0, 19).replace('T', ' ')
  );

  return res.userId;
}

export async function upgradeGuestToUser(userId, email, passwordHash) {
  return apiFetch(`${BASE_URL}/upgrade`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, email, passwordHash }),
  });
}