USE snapgame;

INSERT IGNORE INTO users (
  user_id,
  password_hash,
  nickname,
  coins
)
VALUES (
  'test123',
  '0000',
  'TestUser',
  999999999
);

INSERT IGNORE INTO games (
  game_id,
  name,
  description,
  mode,
  level_count,
  genre_tags
)
VALUES (
  'bottle-flip',
  'Bottle Flip',
  'Flip the bottle',
  'level',
  3,
  NULL
);

INSERT IGNORE INTO games (
  game_id,
  name,
  description,
  mode,
  level_count,
  genre_tags
)
VALUES (
  'time-stop',
  'Time Stop',
  'Stop the timer at the exact moment',
  'score',
  1,
  NULL
);

INSERT IGNORE INTO games (
  game_id,
  name,
  description,
  mode,
  level_count,
  genre_tags
)
VALUES (
  'color-clash',
  'Color Clash',
  'Match the color to the word',
  'score',
  1,
  NULL
);

INSERT IGNORE INTO levels (game_id, level_index, description)
VALUES 
  ('bottle-flip', 1, "Flip the bottle 1 time"),
  ('bottle-flip', 2, "Flip the bottle 2 times"),
  ('bottle-flip', 3, "Flip the bottle 3 times");

INSERT IGNORE INTO levels (game_id, level_index, description)
VALUES 
  ('time-stop', 1, 'Stop the timer at the target second');

INSERT IGNORE INTO levels (game_id, level_index, description)
VALUES 
  ('color-clash', 1, 'Score at least 5 points to pass!');
