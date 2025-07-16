import {
  incrementLevelSuccess,
  incrementLevelAttempt
} from "../../../api/levelApi.js";

function postToParent(type, payload = {}) {
  window.parent.postMessage({ type, ...payload }, "*");
}

export async function showDoubleOrDone(currentLevel, isLastLevel) {
  await incrementLevelSuccess(window.GAME_CONFIG.GAME_ID, currentLevel);

  const reward = window.REWARD.BASE * Math.pow(2, currentLevel - 1);

  if (isLastLevel) {
    window.parent.postMessage({ type: "CLEAR", reward, currentLevel }, "*");
    return;
  }

  const existing = document.getElementById("double-or-done-ui");
  if (existing) existing.remove();

  const container = document.createElement("div");
  container.id = "double-or-done-ui";
  Object.assign(container.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "9999",
    fontFamily: "sans-serif"
  });

  const text = document.createElement("div");
  text.innerHTML = `<div style="font-size: 32px; font-weight: bold;">💰 +${window.REWARD.BASE * Math.pow(2, currentLevel - 1)} Coins <div>
                    <div style="font-size: 24px; margin-top: 10px;">Double or Done?</div>`;
  text.style.color = "white";
  text.style.textAlign = "center";
  text.style.marginBottom = "30px";

  const buttonStyle = {
    fontSize: "20px",
    padding: "14px 28px",
    margin: "12px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    minWidth: "160px"
  };

  const btnDouble = document.createElement("button");
  btnDouble.innerText = "🔥 Double";
  Object.assign(btnDouble.style, buttonStyle, {
    backgroundColor: "#d9644a",
    color: "white"
  });
  btnDouble.onmouseover = () => (btnDouble.style.backgroundColor = "#e64a19");
  btnDouble.onmouseout = () => (btnDouble.style.backgroundColor = "#FF5722");
  btnDouble.onclick = async () => {
    container.remove();
    await incrementLevelAttempt(window.GAME_CONFIG.GAME_ID, currentLevel + 1);
    postToParent("DOUBLE", {
      gameId: window.GAME_CONFIG.GAME_ID,
      level: currentLevel,
      reward: reward
    });
  };

  const btnDone = document.createElement("button");
  btnDone.innerText = "✅ Done";
  Object.assign(btnDone.style, buttonStyle, {
    backgroundColor: "#5aaf72",
    color: "white"
  });
  btnDone.onmouseover = () => (btnDone.style.backgroundColor = "#388E3C");
  btnDone.onmouseout = () => (btnDone.style.backgroundColor = "#4CAF50");
  btnDone.onclick = () => {
    container.remove();
    postToParent("DONE", {
      gameId: window.GAME_CONFIG.GAME_ID,
      level: currentLevel,
      reward: reward
    });
  };

  container.appendChild(text);
  container.appendChild(btnDouble);
  container.appendChild(btnDone);
  document.body.appendChild(container);
}

