import {
  incrementLevelSuccess,
  incrementLevelAttempt
} from "../../../api/levelApi.js";

export async function showDoubleOrDone(score, onDone, onDouble, currentLevel, isLastLevel) {
  await incrementLevelSuccess(window.GAME_CONFIG.GAME_ID, currentLevel);

  if (isLastLevel) {
    window.parent.postMessage({ type: "CLEAR", score, currentLevel }, "*");
    return;
  }

  const existing = document.getElementById("double-or-done-ui");
  if (existing) existing.remove();
  
  const container = document.createElement("div");
  container.id = "double-or-done-ui";
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "0";
  container.style.width = "100%";
  container.style.height = "100%";
  container.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.justifyContent = "center";
  container.style.alignItems = "center";
  container.style.zIndex = "9999";

  const text = document.createElement("div");
  text.innerText = `Score: ${score}\n Double or Done?`;
  text.style.color = "white";
  text.style.fontSize = "24px";
  text.style.marginBottom = "20px";
  text.style.textAlign = "center";

  const btnDouble = document.createElement("button");
  btnDouble.innerText = "🔥 Double";
  btnDouble.style.margin = "10px";
  btnDouble.onclick = async () => {
    container.remove();
    await incrementLevelAttempt(window.GAME_CONFIG.GAME_ID, currentLevel + 1);
    onDouble();
  };

  const btnDone = document.createElement("button");
  btnDone.innerText = "✅ Done";
  btnDone.style.margin = "10px";
  btnDone.onclick = () => {
    container.remove();
    onDone();
  };

  container.appendChild(text);
  container.appendChild(btnDouble);
  container.appendChild(btnDone);
  document.body.appendChild(container);
}
