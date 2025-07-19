import { updateUserCoinUI } from "../ui/coin-ui.js";
import { initSwipeUI } from "../ui/swipe-ui.js";
import { initializeGameOrder } from "../core/load-gameList.js";
import { loadGame, loadNextLevel, loadTransition } from "../core/load-game.js";
import { getUserCoins } from "../api/userApi.js";
import { getGameInfo } from "../api/gameApi.js";
import { getCurrentGameIdx, getGameOrderByIdx, getNextGameIdx, setGameOrder } from "../user-state/gameOrder.js";
import { getLevel, resetLevel } from "../user-state/level.js";

document.addEventListener("DOMContentLoaded", async () => {
  await updateUserCoinUI(window.USER_ID.BASE_ID);
  initSwipeUI();
  let gameOrder = await initializeGameOrder();
  setGameOrder(gameOrder);
  await loadGame(getGameOrderByIdx(0), 0);
});

async function submitResult(userId, reward) {
  try {
    const res = await fetch(`${SERVER_CONFIG.LOCAL_URL}/api/game/result`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, reward })
    });
    const data = await res.json();
    console.log("server response:", data);
  } catch (err) {
    console.error("server response failed:", err);
  }
}

window.addEventListener("message", async (event) => {
  const { type, gameId, level, reward } = event.data;

  switch (type) {
    case "INTRO_READY": {
      const iframe = document.querySelector("iframe");
      iframe?.contentWindow.postMessage(
        { type: "SET_USER_ID", userId: window.USER_ID.BASE_ID },
        "*"
      ); 
      break;
    }

    case "REQUEST_GAME_STATE": {
      const state = {
        type: "INIT_GAME_STATE",
        level: getLevel()
      };

      const iframe = document.getElementById("iframe");
      iframe?.contentWindow?.postMessage(state, "*");
      break;
    }

    case "PLAY": {
      const gameInfo = await getGameInfo(gameId);
      const coins = await getUserCoins(window.USER_ID.BASE_ID);

      await loadNextLevel(getCurrentGameIdx(), getLevel());
      await updateUserCoinUI(window.USER_ID.BASE_ID);
      break;
    }

    case "LOAD_TRANSITION": {
      await loadTransition(getCurrentGameIdx(), getLevel());
      break;
    }

    case "LOAD_NEXT_LEVEL": {
      await loadNextLevel(getCurrentGameIdx(), getLevel());
      break;
    }

    case "DONE": {
      alert("🎉 You earned " + reward + " coins!");

      await submitResult(window.USER_ID.BASE_ID, reward);

      resetLevel();
      await loadGame(getNextGameIdx(), getLevel());
      await updateUserCoinUI(window.USER_ID.BASE_ID);
      break;
    }
  }
});

