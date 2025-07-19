import { createInteractionIcons } from "../ui/interaction-ui.js";
import { getGameManifestList } from "./load-gameList.js";
import { getGameOrder } from "../user-state/gameOrder.js";
import { getLevel, setLevel, resetLevel, incrementLevel } from "../user-state/level.js";

//const GAME_BASE_URL = "https://snapgame.s3.ap-northeast-2.amazonaws.com/games/";
const GAME_BASE_URL = "http://localhost:3000/games/";

export async function loadTransition(gameIndex, levelIndex = 0) {
  const gameList = getGameManifestList();
  const game = gameList[gameIndex];
  if (!game) {
    console.error("❌ Invalid game index:", gameIndex);
    return;
  }

  const gameId = game.gameId;
  const transitionUrl = `${GAME_BASE_URL}${gameId}/level-map/level-map.html?level=${levelIndex}`;

  const wrapper = document.createElement("div");
  wrapper.className = "game-container";
  wrapper.style.position = "relative";

  const iframe = document.createElement("iframe");
  iframe.id = "iframe";
  iframe.src = transitionUrl;
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";

  wrapper.appendChild(iframe);

  const feed = document.getElementById("feed");
  if (!feed) return console.error("❌ #feed not found");

  feed.innerHTML = "";
  feed.appendChild(wrapper);

  console.log(`⏳ Loaded transition screen for: ${gameId}`);
}

export async function loadGame(gameIndex, levelIndex = 0) {
  const gameList = getGameManifestList();
  const game =  gameList[gameIndex];
  if (!game) {
    console.error("❌ Invalid game index:", gameIndex);
    return;
  }

  const gameId = game.gameId;
  const manifestUrl = `${GAME_BASE_URL}${gameId}/manifest.json`;

  try {
    const res = await fetch(manifestUrl);
    if (!res.ok) throw new Error("❌ manifest fetch 실패");

    const manifest = await res.json();

    let rawEntryPath = null;
    if(levelIndex == 0) {
      rawEntryPath = manifest.entry ?? "templates/intro.html";
    }
    else {
      if(game.mode === 'level') {
        rawEntryPath = `levels/level${levelIndex}/index.html`
      }

      if(game.mode === 'score') {
        rawEntryPath = `templates/index.html`
      }
    }

    const entryUrl = new URL(`${gameId}/${rawEntryPath}`, GAME_BASE_URL).toString();

    const wrapper = document.createElement("div");
    wrapper.className = "game-container";
    wrapper.style.position = "relative";

    const iframe = document.createElement("iframe");
    iframe.id = "iframe";
    iframe.src = entryUrl;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";

    const interactionIcons = await createInteractionIcons(gameId);
    wrapper.appendChild(interactionIcons);
    wrapper.appendChild(iframe);

    const feed = document.getElementById("feed");
    if (!feed) return console.error("❌ #feed not found");

    feed.innerHTML = "";
    feed.appendChild(wrapper);

    console.log(`✅ Loaded game: ${gameId}`);
  } catch (err) {
    console.error("❌ loadGame failed:", err);
  }
}

export async function loadNextLevel(gameIndex, levelIndex) {
  const gameOrder = getGameOrder();
  setLevel(levelIndex + 1);
  await loadGame(gameOrder[gameIndex], getLevel());
}

export async function loadPreviousLevel(gameIndex, levelIndex) {
  const gameOrder = getGameOrder();
  setLevel(levelIndex - 1);
  await loadGame(gameOrder[gameIndex], getLevel());
}