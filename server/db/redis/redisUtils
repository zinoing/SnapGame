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

module.exports = {
  hGet,
  hSet,
};
