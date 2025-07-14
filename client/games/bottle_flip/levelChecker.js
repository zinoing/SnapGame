export function getLevelChecker(currentLevel) {
  switch (currentLevel) {
    case 1:
      return {
        succeed: (score) => score >= 1
      };
    case 2:
      return {
        succeed: (score) => score >= 2 
      };
    case 3:
      return {
        succeed: (score) => score >= 3
      };
    default:
      return {
        succeed: () => false
      };
  }
}
