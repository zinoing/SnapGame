import { getLikedGames, likeGame, unlikeGame, getBookmarkedGames, bookmarkGame, unbookmarkGame } from "../api/gameInteractionApi.js";

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

  const likeBtn = document.createElement("button");
  likeBtn.setAttribute("data-liked", "false");
  likeBtn.style.background = "transparent";
  likeBtn.style.border = "none";

  if (window.USER_CONFIG.USER_ID) {
    try {
      const likedGames = await getLikedGames(window.USER_CONFIG.USER_ID);
      const likedGameIds = likedGames.map(g => g.id);
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
      await likeGame(window.USER_CONFIG.USER_ID, gameId);
      likeBtn.innerHTML = likedIconSVG();
      likeBtn.setAttribute("data-liked", "true");
    } else {
      await unlikeGame(window.USER_CONFIG.USER_ID, gameId);
      likeBtn.innerHTML = unlikedIconSVG();
      likeBtn.setAttribute("data-liked", "false");
    }
  });

  container.appendChild(likeBtn);

  const bookmarkBtn = document.createElement("button");
  bookmarkBtn.setAttribute("data-bookmarked", "false");
  bookmarkBtn.style.background = "transparent";
  bookmarkBtn.style.border = "none";

  if (window.USER_CONFIG.USER_ID) {
    try {
      const bookmarkedGames = await getBookmarkedGames(window.USER_CONFIG.USER_ID);
      const bookmarkedIds = bookmarkedGames.map(g => g.id);
      if (bookmarkedIds.includes(gameId)) {
        bookmarkBtn.setAttribute("data-bookmarked", "true");
        bookmarkBtn.innerHTML = bookmarkedIconSVG();
      } else {
        bookmarkBtn.innerHTML = unbookmarkedIconSVG();
      }
    } catch (err) {
      console.error("북마크 상태 불러오기 실패:", err);
      bookmarkBtn.innerHTML = unbookmarkedIconSVG();
    }
  } else {
    bookmarkBtn.innerHTML = unbookmarkedIconSVG();
  }

  bookmarkBtn.addEventListener("click", async () => {
    const isBookmarked = bookmarkBtn.getAttribute("data-bookmarked") === "true";
    if (!isBookmarked) {
      await bookmarkGame(window.USER_CONFIG.USER_ID, gameId);
      bookmarkBtn.innerHTML = bookmarkedIconSVG();
      bookmarkBtn.setAttribute("data-bookmarked", "true");
    } else {
      await unbookmarkGame(window.USER_CONFIG.USER_ID, gameId);
      bookmarkBtn.innerHTML = unbookmarkedIconSVG();
      bookmarkBtn.setAttribute("data-bookmarked", "false");
    }
  });

  container.appendChild(bookmarkBtn);

  return container;
}

function likedIconSVG() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#00aaff" viewBox="0 0 24 24">
      <path d="M1 21h4V9H1v12z" />
      <path d="M23 10c0-1.1-.9-2-2-2h-6.31l.95-4.57a1 1 0 0 0-.29-.7L14.17 2 
               7.59 8.59C7.22 8.95 7 9.45 7 10v10c0 1.1.9 2 2 2h9c.83 0 
               1.54-.5 1.84-1.22l3.02-7.05a1.5 1.5 0 0 0 .14-.73v-1z"/>
    </svg>
  `;
}

function unlikedIconSVG() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" stroke="#00aaff" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
      <path d="M1 21h4V9H1v12z" />
      <path d="M23 10c0-1.1-.9-2-2-2h-6.31l.95-4.57a1 1 0 0 0-.29-.7L14.17 2 
               7.59 8.59C7.22 8.95 7 9.45 7 10v10c0 1.1.9 2 2 2h9c.83 0 
               1.54-.5 1.84-1.22l3.02-7.05a1.5 1.5 0 0 0 .14-.73v-1z"/>
    </svg>
  `;
}

function bookmarkedIconSVG() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#ffaa00" viewBox="0 0 24 24">
      <path d="M6 2a2 2 0 0 0-2 2v18l8-4 8 4V4a2 2 0 0 0-2-2H6z"/>
    </svg>
  `;
}

function unbookmarkedIconSVG() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" stroke="#ffaa00" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
      <path d="M6 2a2 2 0 0 0-2 2v18l8-4 8 4V4a2 2 0 0 0-2-2H6z"/>
    </svg>
  `;
}
