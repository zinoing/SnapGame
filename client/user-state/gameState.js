export const state = {
  isPlaying: false,
};

export function setPlaying(value) {
  state.isPlaying = value;
}

export function getIsPlaying() {
  return state.isPlaying;
}
