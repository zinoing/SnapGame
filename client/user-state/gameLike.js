let likedGames = new Set();

export function likeGame(gameId) {
  likedGames.add(gameId);
}

export function unlikeGame(gameId) {
  likedGames.delete(gameId);
}

export function toggleLike(gameId) {
  if (likedGames.has(gameId)) {
    likedGames.delete(gameId);
  } else {
    likedGames.add(gameId);
  }
}

export function isGameLiked(gameId) {
  return likedGames.has(gameId);
}

export function getLikedGames() {
  return Array.from(likedGames);
}

export function resetLikedGames() {
  likedGames.clear();
}
