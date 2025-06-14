INSERT INTO users (
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
  300,
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