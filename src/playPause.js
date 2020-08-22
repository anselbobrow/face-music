import { startInstrument, stopInstruments } from './synths';

// play/pause video feed, face detection, and instruments
export default function playPause(video) {
  if (video.paused) {
    video.play();
    startInstrument();
  } else {
    video.pause();
    stopInstruments();
  }
}
