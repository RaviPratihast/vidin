const checkingWatchLater = (state, videoId) => {
  return state.watchLater.some(
    (anyWatchLaterVideo) => videoId === anyWatchLaterVideo.id
  );
};
export { checkingWatchLater };
