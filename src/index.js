import playPause from './playPause';
import detectLoop from './detectLoop';
import { toneSetup } from './synths';
import * as faceapi from 'face-api.js';
import './style.css';

// grab elements from html
const video = document.querySelector('.inputVideo');
const canvas = document.querySelector('.overlay');
const pbutton = document.querySelector('#pbutton');
const startButton = document.querySelector('#start-button');
const instrumentIdx = parseInt(document.querySelector('#instr-select'), 10)

let ctx = canvas.getContext('2d');

const setCanvasSize = () => {
  // canvas.width/height is NOT the same as canvas.style.width/height! lesson learned
  canvas.width = parseInt(window.getComputedStyle(video).width, 10);
  canvas.height = parseInt(window.getComputedStyle(video).height, 10);
};

// load face detector and connect to webcam
const start = async () => {
  await faceapi.nets.tinyFaceDetector.loadFromUri('./src/models');
  await faceapi.nets.faceLandmark68TinyNet.loadFromUri('./src/models');

  toneSetup();

  try {
    let stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
    });
    video.srcObject = stream;
  } catch (e) {
    console.error(e);
  }
};

// then set up canvas and go into detection loop
video.onplay = () => {
  setCanvasSize();
  ctx.fillStyle = 'yellow';
  detectLoop(video, canvas, ctx);
};

// bind p and play button to playPause()
pbutton.addEventListener('click', () => {
  playPause(video);
});

window.addEventListener('keypress', e => {
  if (e.key.toLowerCase() === 'p') {
    playPause(video);
  }
});

// trigger video.onplay when resized to reset canvas sizing, or do it manually
window.addEventListener('resize', () => {
  if (!video.paused) {
    video.pause();
    video.play();
  } else {
    setCanvasSize();
  }
});

startButton.addEventListener('click', start);
