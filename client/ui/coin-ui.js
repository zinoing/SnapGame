import { getUserCoins } from "../api/userApi.js";

export async function updateUserCoinUI(userId) {
    try {
        const coins = await getUserCoins(userId);
        document.getElementById("coin-display").textContent = `🪙 ${coins}`;
    } catch (err) {
        console.error("Failed to load coins", err);
    }
}