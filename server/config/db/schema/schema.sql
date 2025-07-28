CREATE SCHEMA IF NOT EXISTS snapgame;
USE snapgame;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100),
    password_hash VARCHAR(255),
    is_guest BOOLEAN DEFAULT FALSE,
    expires_at DATETIME NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME
);

DROP TABLE IF EXISTS games;

CREATE TABLE games (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    game_url VARCHAR(255) NOT NULL,
    thumbnail_url VARCHAR(255),
    entry_url VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(64)
);

DROP TABLE IF EXISTS game_results;

CREATE TABLE game_results (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  session_id BIGINT,
  user_id BIGINT NOT NULL,
  game_id VARCHAR(64) NOT NULL,
  custom_json JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES game_sessions(id)
);

DROP TABLE IF EXISTS game_sessions;

CREATE TABLE game_sessions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    game_id VARCHAR(64) NOT NULL,
    started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    ended_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (game_id) REFERENCES games(id)
);

DROP TABLE IF EXISTS game_likes;

CREATE TABLE game_likes (
  user_id BIGINT,
  game_id VARCHAR(64),
  liked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, game_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (game_id) REFERENCES games(id)
);

DROP TABLE IF EXISTS game_bookmarks;

CREATE TABLE game_bookmarks (
    user_id BIGINT,
    game_id VARCHAR(64),
    bookmarked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, game_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (game_id) REFERENCES games(id)
);

DROP TABLE IF EXISTS game_history;

CREATE TABLE game_history (
    user_id BIGINT,
    game_id VARCHAR(64) NOT NULL,
    total_play_count INT DEFAULT 1,
    last_played_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, game_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (game_id) REFERENCES games(id)
);

SET FOREIGN_KEY_CHECKS = 1;