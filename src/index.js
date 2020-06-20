import playPause from './services/playPause.service';
import detectLoop from './detectLoop';
import * as faceapi from 'face-api.js';
import './style.css';

// grab elements from html
const video = document.querySelector('.inputVideo');
const canvas = document.querySelector('.overlay');
const pbutton = document.querySelector('#pbutton');

// ideal size of video and overlays (suggested: 1280 x 720)
let displaySize = { width: 1280, height: 720 };
let ctx;

// load face detector and connect to webcam
async function start() {
  // other nets to load (for different face detectors/details)
  // ageGenderNet
  // faceExpressionNet
  // faceLandmark68Net
  // faceLandmark68TinyNet
  // faceRecognitionNet
  // ssdMobilenetv1
  // tinyFaceDetector
  // tinyYolov2
  await faceapi.nets.tinyFaceDetector.loadFromUri('./src/models');
  await faceapi.nets.faceLandmark68TinyNet.loadFromUri('./src/models');

  navigator.mediaDevices
    .getUserMedia({
      video: {
        width: { ideal: displaySize.width },
        height: { ideal: displaySize.height },
      },
    })
    .then(stream => (video.srcObject = stream))
    .catch(err => console.error(err));
}

// wait for video to appear (play), then set up canvas and go into detection loop
video.onplay = () => {
  // NOT the same as canvas.style.width/height! lesson learned
  canvas.width = displaySize.width;
  canvas.height = displaySize.height;

  // initialization of canvas drawing tools
  ctx = canvas.getContext('2d');
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 2;

  let detectProps = [video, canvas, ctx, displaySize];

  detectLoop(detectProps);
};

// bind p and play button to playPause()
window.addEventListener('keypress', e => {
  if (e.key.toLowerCase() === 'p') playPause(video);
});
pbutton.addEventListener('click', () => playPause(video));

start();
