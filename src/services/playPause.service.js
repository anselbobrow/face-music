// play/pause video feed and face detection
const playPause = video => {
  if (!video.paused) {
    video.pause();
  } else {
    video.play();
  }
};

export default playPause;