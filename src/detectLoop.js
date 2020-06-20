import sleep from './services/sleep.service';
import * as faceapi from 'face-api.js';

export default async function detectLoop(props) {
  let [video, canvas, ctx, displaySize] = props;
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

  await sleep(100);

  if (!video.paused) detectLoop(props);
}
