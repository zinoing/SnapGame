export function getLevelChecker(currentLevel) {
  const levelConfigs = {
    1: { targetTime: 5},
    2: { targetTime: 7},
    3: { targetTime: 5.0},
    4: { targetTime: 7.0},
    5: { targetTime: 7.00}
  };

  const config = levelConfigs[currentLevel];

  if (config) {
    return {
      targetTime: config.targetTime,
      succeed: (time) => time === config.targetTime
    };
  }

  return {
    targetTime: null,
    succeed: () => false
  };
}
