/* :::: main :::: */
const video = document.querySelector('.video');
const cvs = document.querySelector('.picture');
const newPictureButton = document.querySelector('.new_picture');


const constraint = {
  audio: true,
  video: {
    width: { min: 40, ideal: 1280, max: 1920 },
    height: { min: 20, ideal: 800, max: 1080 }

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