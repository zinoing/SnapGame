export function createInteractionIcons(gameId, userLikes = []) {
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.top = "50%";
  container.style.right = "10px";
  container.style.transform = "translateY(-50%)";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "12px";
  container.style.zIndex = "999";
  container.style.background = "none";

  // like Button
  const likeBtn = document.createElement("button");
  likeBtn.setAttribute("data-liked", "false");

  likeBtn.style.background = "transparent";
  likeBtn.style.border = "none";
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
      userLikes.push(gameId);
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

  container.appendChild(likeBtn);

  return container;
}