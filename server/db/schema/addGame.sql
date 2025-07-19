USE snapgame;

INSERT IGNORE INTO games (
  game_id,
  name,
  description,
  level_count,
  genre_tags
)
VALUES (
  'time_stop',
  'time stop',
  'Stop the timer at the exact moment',
  3,
  NULL
);

INSERT IGNORE INTO levels (game_id, level_index, description)
VALUES 
  ('time_stop', 1, 'Stop the timer at exactly 3.00 seconds'),
  ('time_stop', 2, 'Stop the timer at exactly 3.00 seconds'),
  ('time_stop', 3, 'Stop the timer at exactly 3.00 seconds');
