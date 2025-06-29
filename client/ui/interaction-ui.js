import { fetchLikedGames, likeGame, unlikeGame } from "../api/gameInteractionApi.js";

export async function createInteractionIcons(gameId) {
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

  if (window.USER_ID.BASE_ID) {
    try {
      const likedGames = await fetchLikedGames(window.USER_ID.BASE_ID);
      const likedGameIds = likedGames.map(g => g.game_id); // backend 응답이 [{game_id: "..."}] 형태일 경우
      if (likedGameIds.includes(gameId)) {
        likeBtn.setAttribute("data-liked", "true");
        likeBtn.innerHTML = likedIconSVG();
      } else {
        likeBtn.innerHTML = unlikedIconSVG();
      }
    } catch (err) {
      console.error("좋아요 상태 불러오기 실패:", err);
      likeBtn.innerHTML = unlikedIconSVG();
    }
  } else {
    likeBtn.innerHTML = unlikedIconSVG();
  }

  likeBtn.addEventListener("click", async () => {
    const isLiked = likeBtn.getAttribute("data-liked") === "true";

    if (!isLiked) {
      await likeGame(window.USER_ID.BASE_ID, gameId);
      likeBtn.innerHTML = likedIconSVG();
      likeBtn.setAttribute("data-liked", "true");
    } else {
      await unlikeGame(window.USER_ID.BASE_ID, gameId);
      likeBtn.innerHTML = unlikedIconSVG();
      likeBtn.setAttribute("data-liked", "false");
    }
  });

  container.appendChild(likeBtn);

  return container;
}

function likedIconSVG() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#00aaff" viewBox="0 0 24 24">
      <path d="M1 21h4V9H1v12z" />
      <path d="M23 10c0-1.1-.9-2-2-2h-6.31l.95-4.57a1 1 0 0 0-.29-.7L14.17 2 7.59 8.59 
              C7.22 8.95 7 9.45 7 10v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 
              1.84-1.22l3.02-7.05a1.5 1.5 0 0 0 .14-.73v-1z"/>
    </svg>
  `;
}

function unlikedIconSVG() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" stroke="#00aaff" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
      <path d="M1 21h4V9H1v12z" />
      <path d="M23 10c0-1.1-.9-2-2-2h-6.31l.95-4.57a1 1 0 0 0-.29-.7L14.17 2 7.59 8.59 
              C7.22 8.95 7 9.45 7 10v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 
              1.84-1.22l3.02-7.05a1.5 1.5 0 0 0 .14-.73v-1z"/>
    </svg>
  `;
}