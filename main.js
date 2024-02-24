/* :::: main :::: */
const video = document.querySelector('.video');
const cvs = document.querySelector('.picture');
const newPictureButton = document.querySelector('.new_picture');

const cvsWidth = 800;
const cvsHeight = 400;
const ctx = cvs.getContext('2d');

const constraint = {
  audio: true,
  video: {
    width: { min: 620, ideal: 1280, max: 1920 },
    height: { min: 480, ideal: 800, max: 1080 }

  }
}
async function getUserCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraint);
    video.srcObject = stream;
    window.stream = stream;
  }
  catch (error) {
    alert('error to acces your device camera: ', error)
  }
};
getUserCamera();


newPictureButton.addEventListener('click', () => {
  ctx.drawImage(video, 0, 0, cvsWidth, cvsHeight)
})