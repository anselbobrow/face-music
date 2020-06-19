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
  await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
  await faceapi.nets.faceLandmark68TinyNet.loadFromUri('/models');

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

  detectLoop();
};

async function detectLoop() {
  // create a new detection object using the video frame as input
  // try changing the face detector to achieve different results
  // just remember to load it from the models in start()

  // another important thing to note is that the video and canvas elements are
  // flipped via CSS transform, so the origin of the canvas is now the top right,
  // and all x values coming from the detection should be treated as such
  let detection = await faceapi
    .detectSingleFace(
      video,
      new faceapi.TinyFaceDetectorOptions({ inputSize: 160 })
      // https://github.com/justadudewhohacks/face-api.js/#tinyfacedetectoroptions
    )
    .withFaceLandmarks(true);

  if (detection) {
    // docs said to resize the detection... this did literally nothing for me
    // if you want to see the different detections compared, uncomment the following:
    /*
    let resizedDetection = faceapi.resizeResults(detection, displaySize);
    console.log('d', detection);
    console.log('r', resizedDetection);
    */
    let { x, y, width, height } = detection.detection.box;

    // clear the canvas from the last iteration
    ctx.clearRect(0, 0, displaySize.width, displaySize.height);

    // draw the rectangular frame to the canvas
    // faceapi has a builtin drawBox function, but for some reason it wasn't working for me
    // ctx.strokeRect(x, y, width, height);
    faceapi.draw.drawFaceLandmarks(canvas, detection);
    console.log(detection);
  }

  await sleep(200);

  if (!video.paused) detectLoop();
}

// play/pause video feed and face detection
const playPause = () => {
  if (!video.paused) {
    video.pause();
  } else {
    video.play();
  }
};

// in order to use setTimeout in async functions...
const sleep = ms => new Promise(r => setTimeout(r, ms));

// bind p and play button to playPause()
window.addEventListener('keypress', e => {
  if (e.key.toLowerCase() === 'p') playPause();
});
pbutton.addEventListener('click', playPause);

start();
