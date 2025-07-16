USE snapgame;

INSERT IGNORE INTO users (
  user_id,
  password_hash,
  nickname,
  coins,
  total_play_time,
  last_played_time,
  double_choice_frequency,
  level_attempts,
  clear_rate,
  play_hour_distribution,
  avg_session_duration
)
VALUES (
  'test123',
  '0000',
  'TestUser',
  999999999,
  0,
  NULL,
  0,
  0,
  0,
  JSON_OBJECT(), 
  0
);

INSERT IGNORE INTO games (
  game_id,
  name,
  description,
  level_count,
  play_cost,
  base_reward,
  genre_tags,
  total_play_count,
  avg_clear_rate,
  avg_play_time
)
VALUES (
  'bottle_flip',
  'bottle flip',
  'Flip the bottle',
  3,
  10,
  20,
  NULL,
  0,
  0,
  0
);

INSERT IGNORE INTO games (
  game_id,
  name,
  description,
  level_count,
  play_cost,
  base_reward,
  genre_tags,
  total_play_count,
  avg_clear_rate,
  avg_play_time
)
VALUES (
  'time_stop',
  'time stop',
  'Stop the timer at the exact moment',
  5,
  10,
  20,
  NULL,
  0,
  0,
  0
);

INSERT IGNORE INTO levels (game_id, level_index, description)
VALUES 
  ('bottle_flip', 1, "Flip the bottle 1 time"),
  ('bottle_flip', 2, "Flip the bottle 2 times"),
  ('bottle_flip', 3, "Flip the bottle 3 times");

INSERT IGNORE INTO levels (game_id, level_index, description)
VALUES 
  ('time_stop', 1, 'Stop the timer at exactly 5 seconds'),
  ('time_stop', 2, 'Stop the timer at exactly 7 seconds'),
  ('time_stop', 3, 'Stop the timer at exactly 5.0 seconds'),
  ('time_stop', 4, 'Stop the timer at exactly 7.0 seconds'),
  ('time_stop', 5, 'Stop the timer at exactly 7.00 seconds');
