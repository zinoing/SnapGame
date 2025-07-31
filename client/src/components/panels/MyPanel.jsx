import React, { useState, useEffect } from "react";
import "./MyPanel.css";
import {
  getLikedGames,
  getBookmarkedGames,
  getGameHistory,
  deleteGameHistory,
} from "../../api/userGameStatsApi";
import {
  unlikeGame,
  unbookmarkGame,
} from "../../api/gameInteractionApi";
import { getGameInfo } from "../../api/gameApi";

const TAB_LABELS = ["Recent", "Bookmarks", "Likes"];

function MyPanel({ visible, onClose, onSelectGame }) {
  const [activeTab, setActiveTab] = useState("Recent");
  const [gameList, setGameList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchGameList = async () => {
    setLoading(true);
    let rawList = [];

    const userId = window.USER_CONFIG.USER_ID;

    try {
      switch (activeTab) {
        case "Recent":
          rawList = await getGameHistory(userId);
          break;
        case "Bookmarks":
          rawList = await getBookmarkedGames(userId);
          break;
        case "Likes":
          rawList = await getLikedGames(userId);
          break;
        default:
          break;
      }

      const enriched = await Promise.all(
        rawList.map(async (entry) => {
          const info = await getGameInfo(entry.game_id);
          return { ...info };
        })
      );

      setGameList(enriched);
    } catch (err) {
      console.error("📛 Failed to fetch user game stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (visible) {
      fetchGameList();
    }
  }, [activeTab, visible]);

  const handleRemove = async (gameId) => {
    try {
      switch (activeTab) {
        case "Recent":
          await deleteGameHistory(userId, gameId);
          break;
        case "Bookmarks":
          await unbookmarkGame(userId, gameId);
          break;
        case "Likes":
          await unlikeGame(userId, gameId);
          break;
        default:
          break;
      }
      fetchGameList();
    } catch (err) {
      console.error("❌ Failed to remove game:", err);
    }
  };

  const handleSelect = (game) => {
    onSelectGame?.(game);
  };

  if (!visible) return null;

  return (
    <div className="my-panel-overlay">
      <div className="my-panel">
        {/* Header */}
        <div className="my-panel-header">
          <h2>My Games</h2>
          <button className="my-panel-close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Tabs */}
        <div className="my-panel-tabs">
          {TAB_LABELS.map((label) => (
            <button
              key={label}
              className={`my-panel-tab-btn ${activeTab === label ? "active" : ""}`}
              onClick={() => setActiveTab(label)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Game List */}
        <div className="my-panel-content">
          {loading ? (
            <p>Loading...</p>
          ) : gameList.length === 0 ? (
            <p>
              {activeTab === "Recent" && "No recently played games."}
              {activeTab === "Bookmarks" && "No bookmarked games."}
              {activeTab === "Likes" && "No liked games yet."}
            </p>
          ) : (
            <div className="my-panel-game-card-grid">
              {gameList.map((game) => (
                <button
                  key={game.id}
                  className="my-panel-game-card"
                  style={{ backgroundImage: `url(${game.thumbnail_url})` }}
                  onClick={() => handleSelect(game)}
                >
                  <span
                    className="my-panel-remove-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(game.id);
                    }}
                  >
                    ✖
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyPanel;
