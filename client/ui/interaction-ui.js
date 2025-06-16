export function createInteractionIcons(gameId, userLikes = [], userFavorites = []) {
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.top = "50%";
  container.style.right = "10px";
  container.style.transform = "translateY(-50%)";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "12px";
  container.style.zIndex = "999";

  // like Button
  const likeBtn = document.createElement("button");
  likeBtn.setAttribute("data-liked", "false");

  likeBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" 
        width="25" height="25" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="#00aaff" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round">
      <path d="M1 21h4V9H1v12z" />
      <path d="M23 10c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32a1 1 0 0 0-.29-.7L14.17 2 
              7.59 8.59C7.22 8.95 7 9.45 7 10v10c0 1.1.9 2 2 2h9c.83 0 
              1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1z"/>
    </svg>
  `;

  likeBtn.addEventListener("click", () => {
    const isLiked = likeBtn.getAttribute("data-liked") === "true";

    if (!isLiked) {
      likeBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" 
            width="25" height="25" 
            viewBox="0 0 24 24" 
            fill="#00aaff">
          <path d="M1 21h4V9H1v12z" />
          <path d="M23 10c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32a1 1 0 0 0-.29-.7L14.17 2 
                  7.59 8.59C7.22 8.95 7 9.45 7 10v10c0 1.1.9 2 2 2h9c.83 0 
                  1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1z"/>
        </svg>
      `;
      likeBtn.setAttribute("data-liked", "true");
    } else {
      likeBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" 
            width="25" height="25" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#00aaff" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round">
          <path d="M1 21h4V9H1v12z" />
          <path d="M23 10c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32a1 1 0 0 0-.29-.7L14.17 2 
                  7.59 8.59C7.22 8.95 7 9.45 7 10v10c0 1.1.9 2 2 2h9c.83 0 
                  1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1z"/>
        </svg>
      `;
      likeBtn.setAttribute("data-liked", "false");
    }
  });

  // Favorite Button
  const favBtn = document.createElement("button");
  favBtn.className = "fav-button";
  favBtn.setAttribute("data-favorited", "false");

  favBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg"
        width="25" height="25"
        viewBox="0 0 140 140"
        fill="none"
        stroke="#ff3366"
        stroke-width="4"
        style="display: block; margin: auto;">
      <path d="M60.83,17.19C68.84,8.84,74.45,1.62,86.79,0.21c23.17-2.66,44.48,21.06,32.78,44.41 
              c-3.33,6.65-10.11,14.56-17.61,22.32c-8.23,8.52-17.34,16.87-23.72,23.2l-17.4,17.26L46.46,93.56
              C29.16,76.9,0.95,55.93,0.02,29.95C-0.63,11.75,13.73,0.09,30.25,0.3C45.01,0.5,51.22,7.84,60.83,17.19Z"/>
    </svg>
  `;

  favBtn.addEventListener("click", () => {
    const isFavorited = favBtn.getAttribute("data-favorited") === "true";

    if (!isFavorited) {
      favBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg"
            width="25" height="25"
            viewBox="0 0 140 140"
            fill="#ff3366"
            style="display: block; margin: auto;">
          <path d="M60.83,17.19C68.84,8.84,74.45,1.62,86.79,0.21c23.17-2.66,44.48,21.06,32.78,44.41 
                  c-3.33,6.65-10.11,14.56-17.61,22.32c-8.23,8.52-17.34,16.87-23.72,23.2l-17.4,17.26L46.46,93.56
                  C29.16,76.9,0.95,55.93,0.02,29.95C-0.63,11.75,13.73,0.09,30.25,0.3C45.01,0.5,51.22,7.84,60.83,17.19Z"/>
        </svg>
      `;
      favBtn.setAttribute("data-favorited", "true");
    } else {
      favBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg"
            width="25" height="25"
            viewBox="0 0 140 140"
            fill="none"
            stroke="#ff3366"
            stroke-width="4"
            style="display: block; margin: auto;">
          <path d="M60.83,17.19C68.84,8.84,74.45,1.62,86.79,0.21c23.17-2.66,44.48,21.06,32.78,44.41 
                  c-3.33,6.65-10.11,14.56-17.61,22.32c-8.23,8.52-17.34,16.87-23.72,23.2l-17.4,17.26L46.46,93.56
                  C29.16,76.9,0.95,55.93,0.02,29.95C-0.63,11.75,13.73,0.09,30.25,0.3C45.01,0.5,51.22,7.84,60.83,17.19Z"/>
        </svg>
      `;
      favBtn.setAttribute("data-favorited", "false");
    }
  });

  container.appendChild(likeBtn);
  container.appendChild(favBtn);

  return container;
}

export function setupInteractionUI(gameId, targetSelector = ".game-container") {
  const container = document.querySelector(targetSelector);
  if (!container) {
    console.warn("No container found for interaction UI");
    return;
  }

  const interactionIcons = createInteractionIcons(gameId);
  container.appendChild(interactionIcons);
}
