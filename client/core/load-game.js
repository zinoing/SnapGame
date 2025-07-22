import { createInteractionIcons } from "../ui/interaction-ui.js";

//const GAME_BASE_URL = `${window.SERVER_CONFIG?.GAME_BASE_URL || "http://localhost:3000"}/`;
const GAME_BASE_URL = `https://snapgame.s3.ap-northeast-2.amazonaws.com/`;

export async function loadGameAsync(game, isIntro) {
  try {
    const entryUrl = buildEntryUrl(game, isIntro);

    const wrapper = createGameWrapper();
    const iframe = createIframe(entryUrl);
    wrapper.appendChild(iframe);

    if(isIntro) {
      const interactionIcons = await createInteractionIcons(game.id);
      wrapper.appendChild(interactionIcons);
    }
    
    const feed = document.getElementById("feed");
    if (!feed) {
      console.error("❌ #feed not found");
      return;
    }

    feed.innerHTML = "";
    feed.appendChild(wrapper);

    console.log(`✅ Loaded game: ${game.title}`);
  } catch (err) {
    console.error("❌ loadGameAsync failed:", err);
  }
}

function buildEntryUrl(game, isIntro) {
  if(isIntro) {
    return new URL("../intro/intro.html", "http://localhost:3000").toString();
  }
  else {
    return game.entry_url;
  }
}

function createGameWrapper() {
  const wrapper = document.createElement("div");
  wrapper.className = "game-container";
  wrapper.style.position = "relative";
  return wrapper;
}

function createIframe(src) {
  const iframe = document.createElement("iframe");
  iframe.id = "iframe";
  iframe.src = src;
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  return iframe;
}
