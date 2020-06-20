// play/pause video feed and face detection
export default function playPause(video) {
  if (!video.paused) {
    video.pause();
  } else {
    video.play();
  }
}
