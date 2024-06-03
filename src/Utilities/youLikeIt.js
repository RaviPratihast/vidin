const youLikeIt = (state, videoId) => {
  return state.liked.find((likedVideo) => videoId === likedVideo);
};

export { youLikeIt };

