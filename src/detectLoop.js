import * as faceapi from 'face-api.js';
import { updateInstruments } from './synths';

export default async function detectLoop(video, canvas, ctx) {
  // an important thing to note is that the video and canvas elements are
  // flipped via CSS transform, so the origin of the canvas is now at the top right
  let detection = await faceapi
    .detectSingleFace(
      video,
      new faceapi.TinyFaceDetectorOptions({ inputSize: 128 })
      // https://github.com/justadudewhohacks/face-api.js/#tinyfacedetectoroptions
    )
    .withFaceLandmarks(true);

  if (detection) {
    // pass the relative position of the landmark to the synths function
    updateInstruments({
      x: detection.landmarks.relativePositions[30].x,
      y: detection.landmarks.relativePositions[30].y,
    });

    // resizing the detection here turns out to be necessary
    // if we want the window to resize properly
    detection = faceapi.resizeResults(detection, canvas);

    // grab a point from somewhere roughly on the nose
    let { x, y } = detection.landmarks.positions[30];

    // clear the canvas from the last iteration
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw a circle at (x, y)
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();

    // this draws a full face to the canvas, but it messes with our custom nose-tracker
    // faceapi.draw.drawFaceLandmarks(canvas, detection);
  }
  if (!video.paused) detectLoop(video, canvas, ctx);
}
