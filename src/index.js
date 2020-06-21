import playPause from './services/playPause.service';
import detectLoop from './detectLoop';
import * as faceapi from 'face-api.js';
import './style.css';

// grab elements from html
const video = document.querySelector('.inputVideo');
const canvas = document.querySelector('.overlay');
const pbutton = document.querySelector('#pbutton');

let ctx = canvas.getContext('2d');

// load face detector and connect to webcam
async function start() {
  await faceapi.nets.tinyFaceDetector.loadFromUri('./src/models');
  await faceapi.nets.faceLandmark68TinyNet.loadFromUri('./src/models');

  try {
    let stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
    });
    video.srcObject = stream;
  } catch (e) {
    console.log(e);
  }
}

// then set up canvas and go into detection loop
video.onplay = () => {
  // NOT the same as canvas.style.width/height! lesson learned
  canvas.width = parseInt(window.getComputedStyle(video).width, 10);
  canvas.height = parseInt(window.getComputedStyle(video).height, 10);

  ctx.fillStyle = 'blue';

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

// retrigger video.onplay when resized to reset canvas sizing
// and the detectLoop function
window.addEventListener('resize', () => {
  if (!video.paused) {
    video.pause();
    video.play();
  }
});

start();
