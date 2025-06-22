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
  '0000', -- 테스트용, 실제 운영 시 bcrypt 해시로 대체
  'TestUser',
  3000,
  0,
  NULL,
  0,
  0,
  0,
  JSON_OBJECT(), -- 빈 JSON 객체
  0
)
ON DUPLICATE KEY UPDATE
  coins = 300;

INSERT IGNORE INTO games (
  game_id,
  name,
  game_description,
  level_count,
  play_cost,
  base_reward,
  genre_tags,
  total_play_count,
  avg_clear_rate,
  avg_play_time
)
VALUES (
  'clickbox1',
  'clickbox1',
  'Click red box',
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
  game_description,
  level_count,
  play_cost,
  base_reward,
  genre_tags,
  total_play_count,
  avg_clear_rate,
  avg_play_time
)
VALUES (
  'clickbox2',
  'clickbox2',
  'Click blue box',
  3,
  20,
  30,
  NULL,
  0,
  0,
  0
);