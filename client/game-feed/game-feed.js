import { initSwipeUI } from "../ui/swipe-ui.js";
import { initializeGameOrder } from "../core/load-gameList.js";
import { loadGameAsync} from "../core/load-game.js";
import { getCurrentGame, setGameOrder } from "../user-state/gameOrder.js";
import { handleGameMessage } from "../handlers/iframe-message-handler.js";

document.addEventListener("DOMContentLoaded", async () => {
  initSwipeUI();
  const gameOrder = await initializeGameOrder();
  setGameOrder(gameOrder);
  await loadGameAsync(getCurrentGame(), true);
});

window.addEventListener("message", (event) => handleGameMessage(event));