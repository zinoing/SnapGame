CREATE SCHEMA IF NOT EXISTS snapgame;
USE snapgame;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id VARCHAR(50) PRIMARY KEY,
  password_hash VARCHAR(255), -- nullable if using Google/Apple login
  nickname VARCHAR(100) NOT NULL,
  coins INT DEFAULT 0
);

DROP TABLE IF EXISTS games;

CREATE TABLE games (
  game_id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(100) NOT NULL,
  mode VARCHAR(50) NOT NULL,
  level_count INT NOT NULL,
  genre_tags JSON -- e.g. ["reflex", "timing"]
);

DROP TABLE IF EXISTS levels;

CREATE TABLE levels (
  game_id VARCHAR(50),
  level_index INT,
  description VARCHAR(100) NOT NULL,
  level_attempts INT DEFAULT 0,
  level_successes INT DEFAULT 0,
  PRIMARY KEY (game_id, level_index),
  FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE
);

CREATE TABLE game_likes (
  user_id VARCHAR(50),
  game_id VARCHAR(50),
  liked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, game_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (game_id) REFERENCES games(game_id)
);

SET FOREIGN_KEY_CHECKS = 1;