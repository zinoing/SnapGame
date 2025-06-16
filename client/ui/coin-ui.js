import { getUserCoins } from "../../../api/userApi.js";

export async function updateUserCoinUI() {
    try {
        const coins = await getUserCoins(window.USER_ID.BASE_ID);
        document.getElementById("coin-display").textContent = `🪙 Coins: ${coins}`;
    } catch (err) {
        console.error("Failed to load coins", err);
    }
}