/* :::: main :::: */
const video = document.querySelector('.video');
const cvs = document.querySelector('.picture');
const newPictureButton = document.querySelector('.new_picture');
const startButton = document.querySelector('.start_webcam');
const stopButton = document.querySelector('.stop_webcam');


const cvsWidth = 800;
const cvsHeight = 400;
const ctx = cvs.getContext('2d');

const constraint = {
  audio: true,
  video: {
    width: cvsWidth,
    height: cvsHeight,

  }
}


let stream;

startButton.addEventListener('click', async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia(constraint);
    video.srcObject = stream;
    //window.stream = stream;
    startButton.disabled = true;
    stopButton.disabled = false;
  } catch (error) {
    console.error('Error accessing webcam:', error);
  }
});


stopButton.addEventListener('click', () => {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    video.srcObject = null;
    startButton.disabled = false;
    stopButton.disabled = true;
  }
});



/* async function getUserCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraint);
    video.srcObject = stream;
    window.stream = stream;
  }
  catch (error) {
    alert('error to acces your device camera: ', error)
  }
};
getUserCamera(); */


newPictureButton.addEventListener('click', () => {
  ctx.drawImage(video, 0, 0, cvsWidth / 3, cvsHeight / 3)
})