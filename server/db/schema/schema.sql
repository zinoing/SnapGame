USE snapgame;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id VARCHAR(50) PRIMARY KEY,
  password_hash VARCHAR(255), -- nullable if using Google/Apple login
  nickname VARCHAR(100) NOT NULL,
  coins INT DEFAULT 0,
  total_play_time INT DEFAULT 0, -- in seconds
  last_played_time DATETIME,
  double_choice_frequency FLOAT DEFAULT 0,
  level_attempts INT DEFAULT 0,
  clear_rate FLOAT DEFAULT 0,
  play_hour_distribution JSON, -- e.g. { "10": 5, "14": 10 }
  avg_session_duration INT DEFAULT 0, -- in seconds
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS games;

CREATE TABLE games (
  game_id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  level_count INT NOT NULL,
  genre_tags JSON, -- e.g. ["reflex", "timing"]
  total_play_count INT DEFAULT 0,
  avg_clear_rate FLOAT DEFAULT 0,
  avg_play_time INT DEFAULT 0, -- in seconds
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS levels;

CREATE TABLE levels (
  game_id VARCHAR(50),
  level_index INT,
  double_attempts INT DEFAULT 0,
  double_successes INT DEFAULT 0,
  avg_clear_time INT DEFAULT 0,
  fail_rate FLOAT DEFAULT 0,
  PRIMARY KEY (game_id, level_index),
  FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE
);

CREATE TABLE game_likes (
  user_id VARCHAR(50),
  game_id INT,
  liked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, game_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (game_id) REFERENCES games(game_id)
);

CREATE TABLE game_favorites (
  user_id VARCHAR(50),
  game_id INT,
  favorited_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, game_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (game_id) REFERENCES games(game_id)
);


SET FOREIGN_KEY_CHECKS = 1;