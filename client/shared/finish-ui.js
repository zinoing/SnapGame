function showDoubleOrFinish(score, onFinish, onDouble, currentLevel, isLastLevel) {
  if (isLastLevel) {
    window.parent.postMessage({ type: "clear", score, currentLevel }, "*");
    return;
  }

  const existing = document.getElementById("double-or-finish-ui");
  if (existing) existing.remove();
  
  const container = document.createElement("div");
  container.id = "double-or-finish-ui";
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
  text.innerText = `Score: ${score}\nDo you want to DOUBLE or FINISH?`;
  text.style.color = "white";
  text.style.fontSize = "24px";
  text.style.marginBottom = "20px";
  text.style.textAlign = "center";

  const btnDouble = document.createElement("button");
  btnDouble.innerText = "🔥 Double";
  btnDouble.style.margin = "10px";
  btnDouble.onclick = () => {
    container.remove();
    onDouble();
  };

  const btnFinish = document.createElement("button");
  btnFinish.innerText = "✅ Finish";
  btnFinish.style.margin = "10px";
  btnFinish.onclick = () => {
    container.remove();
    onFinish();
  };

  container.appendChild(text);
  container.appendChild(btnDouble);
  container.appendChild(btnFinish);
  document.body.appendChild(container);
}
