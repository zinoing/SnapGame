import React, { useState, useEffect } from "react";
import "./MyPanel.css";
import {
  getLikedGames,
  getBookmarkedGames,
  getGameHistory,
} from "../../api/userGameStatsApi";

const TAB_LABELS = ["Recent", "Bookmarks", "Likes"];

function MyPanel({ visible, onClose }) {
  const [activeTab, setActiveTab] = useState("Recent");
  const [loading, setLoading] = useState(false);
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    if (!visible) return;

    async function fetchData() {
      setLoading(true);
      let result = [];

      try {
        if (activeTab === "Recent") {
          result = await getGameHistory();
        } else if (activeTab === "Bookmarks") {
          result = await getBookmarkedGames();
        } else if (activeTab === "Likes") {
          result = await getLikedGames();
        }
      } catch (err) {
        console.error("📛 Failed to fetch user game stats:", err);
      }

      setGameList(result || []);
      setLoading(false);
    }

    fetchData();
  }, [activeTab, visible]);

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
            <ul className="game-list">
              {gameList.map((game, index) => (
                <li key={index} className="game-list-item">
                  {game.game_id}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyPanel;
