const redis = require("./redis");

/**
 * Redis 해시에서 필드 값을 가져옴
 * @param {string} key - Redis 해시 키
 * @param {string} field - 가져올 필드명
 * @returns {Promise<string|null>} - 값 (없으면 null)
 */
const hGet = async (key, field) => {
  try {
    const value = await redis.hGet(key, field);
    return value;
  } catch (err) {
    console.error(`hGet error [${key} -> ${field}]:`, err);
    return null;
  }
};

/**
 * Redis 해시에 필드 값을 설정
 * @param {string} key - Redis 해시 키
 * @param {string} field - 설정할 필드명
 * @param {string|number} value - 저장할 값
 * @returns {Promise<void>}
 */
const hSet = async (key, field, value) => {
  try {
    await redis.hSet(key, field, value.toString());
  } catch (err) {
    console.error(`hSet error [${key} -> ${field}]:`, err);
  }
};

/**
 * Redis Sorted Set에서 높은 score 순으로 범위 조회
 * @param {string} key - ZSET 키
 * @param {number} start - 시작 인덱스 (0부터)
 * @param {number} stop - 끝 인덱스 (ex: 9 → 상위 10명)
 * @param {boolean} withScores - score 포함 여부
 * @returns {Promise<Array>} - 멤버 또는 [멤버, score, 멤버, score, ...]
 */
const zRevRange = async (key, start, stop, withScores = false) => {
  try {
    const args = [key, start.toString(), stop.toString()];
    if (withScores) args.push("WITHSCORES");

    const result = await redis.sendCommand(["ZREVRANGE", ...args]);
    return result;
  } catch (err) {
    console.error(`zRevRange error [${key}]:`, err);
    return [];
  }
};

module.exports = {
  hGet,
  hSet,
  zRevRange,
};