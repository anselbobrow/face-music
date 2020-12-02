import { startInstrument, stopInstruments } from './synths';

// TODO: grab selected instrument from radio buttons
// TODO: assign instrumentIdx based on selection

// play/pause video feed, face detection, and instruments
export default function playPause(video) {
  if (video.paused) {
    video.play();
    // TODO: pass idx to startInstrument
    startInstrument();
  } else {
    video.pause();
    stopInstruments();
  }
}

// when selecting an instrument, update the instrumentIdx
synths.