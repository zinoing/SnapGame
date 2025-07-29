import React, { useEffect, useState } from "react";
import {
  getLikedGames,
  likeGame,
  unlikeGame,
  getBookmarkedGames,
  bookmarkGame,
  unbookmarkGame,
} from "../../api/gameInteractionApi";

function InteractionIcons({ userId, gameId }) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    async function fetchStatus() {
      if (userId) {
        const likedGames = await getLikedGames(userId);
        const bookmarkedGames = await getBookmarkedGames(userId);

        setLiked(likedGames.map((g) => g.id).includes(gameId));
        setBookmarked(bookmarkedGames.map((g) => g.id).includes(gameId));
      }
    }

    fetchStatus();
  }, [gameId, userId]);

  const toggleLike = async () => {
    if (liked) {
      await unlikeGame(userId, gameId);
    } else {
      await likeGame(userId, gameId);
    }
    setLiked(!liked);
  };

  const toggleBookmark = async () => {
    if (bookmarked) {
      await unbookmarkGame(userId, gameId);
    } else {
      await bookmarkGame(userId, gameId);
    }
    setBookmarked(!bookmarked);
  };

  return (
    <div style={{
      position: "absolute",
      top: "50%",
      right: "3px",
      transform: "translateY(-50%)",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      zIndex: "999",
    }}>
      <button onClick={toggleLike} style={{ background: "transparent", border: "none" }}>
        <img
          src={liked ? "/icons/like-filled.svg" : "/icons/like-outline.svg"}
          alt="like"
          style={{ width: "30px", height: "30px" }}
        />
      </button>

      <button onClick={toggleBookmark} style={{ background: "transparent", border: "none" }}>
        <img
          src={bookmarked ? "/icons/bookmark-filled.svg" : "/icons/bookmark-outline.svg"}
          alt="bookmark"
          style={{ width: "30px", height: "30px" }}
        />
      </button>

    </div>
  );
}

export default InteractionIcons;