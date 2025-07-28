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
  unbookmarkGame
} from "../../api/gameInteractionApi";
import { getGameInfo } from "../../api/gameApi"

const TAB_LABELS = ["Recent", "Bookmarks", "Likes"];

function MyPanel({ visible, onClose }) {
  const [activeTab, setActiveTab] = useState("Recent");
  const [gameList, setGameList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (userId) => {
    setLoading(true);
    let rawList = [];

    try {
      if (activeTab === "Recent") {
        rawList = await getGameHistory(userId);
      } else if (activeTab === "Bookmarks") {
        rawList = await getBookmarkedGames(userId);
      } else if (activeTab === "Likes") {
        rawList = await getLikedGames(userId);
      }

      const enrichedList = await Promise.all(
        rawList.map(async (entry) => {
          const info = await getGameInfo(entry.game_id);
          return {
            ...info,
          };
        })
      );

      setGameList(enrichedList);
    } catch (err) {
      console.error("📛 Failed to fetch user game stats:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!visible) return;
    fetchData(window.USER_CONFIG.USER_ID);
  }, [activeTab, visible]);


  const handleRemove = async (userId, gameId) => {
    try {
      if (activeTab === "Recent") {
        await deleteGameHistory(userId, gameId);
      } else if (activeTab === "Bookmarks") {
        await unbookmarkGame(userId, gameId);
      } else if (activeTab === "Likes") {
        await unlikeGame(userId, gameId);
      }
      fetchData(userId);
    } catch (err) {
      console.error("❌ Failed to remove game:", err);
    }
  };

  if (!visible) return null;

  return (
    <div className="my-panel-overlay">
      <div className="my-panel">
        <div className="my-panel-header">
          <h2>My Games</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="my-panel-tabs">
          {TAB_LABELS.map(label => (
            <button
              key={label}
              className={`tab-btn ${activeTab === label ? "active" : ""}`}
              onClick={() => setActiveTab(label)}
            >
              {label}
            </button>
          ))}
        </div>

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
            <div className="game-card-grid">
              {gameList.map((game) => (
                <div key={game.id} 
                     className="game-card"
                     style={{ backgroundImage: `url(${game.thumbnail_url})` }}
                >
                  <button className="remove-btn" onClick={() => handleRemove(window.USER_CONFIG.USER_ID, game.id)}>✖</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyPanel;
