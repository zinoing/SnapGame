export function getLevelChecker(currentLevel) {

switch (currentLevel) {
  case 1:
    return {
      succeed: ({ score }) => score === 5,
    };
  case 2:
    return {
      succeed: ({ score }) => score === 10,
    };
  case 3:
    return {
      succeed: ({ score }) => score === 15,
    };
  default:
      return { succeed: () => false };
  }
}