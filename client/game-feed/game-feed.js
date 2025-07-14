import { updateUserCoinUI } from "../ui/coin-ui.js";
import { initSwipeUI } from "../ui/swipe-ui.js";
import { initializeGameOrder } from "../core/load-gameList.js";
import { loadGame, loadNextLevel } from "../core/load-game.js";
import { getUserCoins, updateUserCoins } from "../api/userApi.js";
import { getGameInfo } from "../api/gameApi.js";
import { getCurrentGameIdx, getCurrentGame, getGameOrderByIdx, getNextGameIdx, setGameOrder } from "../user-state/gameOrder.js";
import { getScore, setScore, resetScore } from "../user-state/score.js";
import { getLevel, setLevel, resetLevel, incrementLevel } from "../user-state/level.js";
import { getGameManifestList } from "../core/load-gameList.js";

document.addEventListener("DOMContentLoaded", async () => {
  await updateUserCoinUI(window.USER_ID.BASE_ID);
  initSwipeUI();
  let gameOrder = await initializeGameOrder();
  setGameOrder(gameOrder);
  await loadGame(getGameOrderByIdx(0), 0);
});

async function submitResult(userId, level, gameId) {
  try {
    const res = await fetch(`${SERVER_CONFIG.BASE_URL}/api/game/result`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, level, gameId })
    });
    const data = await res.json();
    console.log("server response:", data);
  } catch (err) {
    console.error("server response failed:", err);
  }
}

window.addEventListener("message", async (event) => {
  const { type, gameId, level, score } = event.data;

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
        score: getScore(),
        level: getLevel()
      };

      const iframe = document.getElementById("iframe");
      iframe?.contentWindow?.postMessage(state, "*");
      break;
    }

    case "PLAY": {
      const gameInfo = await getGameInfo(gameId);
      const coins = await getUserCoins(window.USER_ID.BASE_ID);

      await updateUserCoins(window.USER_ID.BASE_ID, { coins: coins - gameInfo.play_cost });
      await loadNextLevel(getCurrentGameIdx(), getLevel());
      await updateUserCoinUI(window.USER_ID.BASE_ID);
      break;
    }

    case "FAIL": {
      resetScore();
      resetLevel();
      alert("You failed");
      await loadGame(getCurrentGame(), getLevel());
      break;
    }

    case "DONE": {
      alert("🎉 You scored " + score + " points!");

      setScore(score);
      await submitResult(window.USER_ID.BASE_ID, level, gameId);

      resetScore();
      resetLevel();
      await loadGame(getNextGameIdx(), getLevel());
      await updateUserCoinUI(window.USER_ID.BASE_ID);
      break;
    }

    case "DOUBLE": {
      setScore(score);
      const game = getGameManifestList()[getCurrentGameIdx()];
      if (level + 1 < game.levels.length) {
        setLevel(level + 1);
        await loadGame(getCurrentGame(), getLevel());
      }
      break;
    }

    case "CLEAR": {
      alert("🎉 You cleared the final level!");
      alert("🎉 You scored " + score + " points!");

      setScore(score);
      await submitResult(window.USER_ID.BASE_ID, level, gameId);

      resetScore();
      resetLevel();
      await loadGame(getNextGameIdx(), getLevel());
      await updateUserCoinUI(window.USER_ID.BASE_ID);
      break;
    }
  }
});

