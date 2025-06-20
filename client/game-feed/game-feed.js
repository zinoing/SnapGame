import { updateUserCoinUI } from "../ui/coin-ui.js";
import { initSwipeUI } from "../ui/swipe-ui.js";
import {
  initializeGameList,
  loadGame,
  loadNextGame,
  loadPreviousGame,
  currentGameIndex,
  currentLevelIndex
} from "../core/load-game.js";

import { getUserCoins, updateUserCoins } from "../api/userApi.js";
import { getGameInfo } from "../api/gameApi.js";

document.addEventListener("DOMContentLoaded", async () => {
  await updateUserCoinUI();
  initSwipeUI();
  initializeGameList();
});

async function submitResult(userId, level, gameId) {
  try {
    const res = await fetch(`${SERVER_CONFIG.BASE_URL}/api/game/result`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, level, gameId })
    });
    const data = await res.json();
    console.log("서버 응답:", data);
  } catch (err) {
    console.error("서버 요청 실패:", err);
  }
}

window.addEventListener("message", async (event) => {
    const { type, score, level, gameId } = event.data;

    switch(type) {
      case "play": {
        let gameInfo = await getGameInfo(gameId);
        let coins = await getUserCoins(window.USER_ID.BASE_ID);
        
        await updateUserCoins(window.USER_ID.BASE_ID, { coins: coins - gameInfo.play_cost});
        await updateUserCoinUI();
        loadGame(currentGameIndex, level + 1);
        break;
      }

      case "fail": {
        alert("You failed");
        // 처음으로 되돌아가기 혹은 광고 보고 리플레이 가능
        loadGame(currentGameIndex, 0);
        break;
      }

      case "finish": {
        alert("🎉 You scored " + score + " points!");

        await submitResult(window.USER_ID.BASE_ID, level, gameId);
        await updateUserCoinUI();
        loadNextGame();
        break;
      }

      case "double": {
        const game = gameList[currentGameIndex];
        if (currentLevelIndex + 1 < game.levels.length) {
            loadGame(currentGameIndex, level + 1);
        }
        break;
      }

      case "clear": {
        alert("🎉 You cleared the final level!");
        alert("🎉 You scored " + score + " points!");

        await submitResult(window.USER_ID.BASE_ID, level, gameId);
        await updateUserCoinUI();
        loadGame(currentGameIndex, 0);
        break;
      }
    }
});
