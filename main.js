/* :::: main :::: */
const video = document.querySelector('.video');
const cvsWrap = document.querySelector('.cvs_wrap');
const newPictureButton = document.querySelector('.new_picture');
const startButton = document.querySelector('.start_webcam');
const stopButton = document.querySelector('.stop_webcam');


const cvsWidth = 800;
const cvsHeight = 400;


const constraint = {
  audio: true,
  video: {
    width: cvsWidth,
    height: cvsHeight,

  }
};

let stream;

startButton.addEventListener('click', async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia(constraint);
    video.srcObject = stream;
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



newPictureButton.addEventListener('click', () => {

  const cvs = document.createElement('canvas');
  const ctx = cvs.getContext('2d');
  cvsWrap.appendChild(cvs);
  ctx.drawImage(video, 0, 0, cvsWidth / 3, cvsHeight / 3);

  cvs.addEventListener('click', () => {
    /* show modal with options to save or delete the canvas*/
    const modal = document.createElement('div');
    modal.classList.add('picture_modal');

    const options = document.createElement('div');
    options.classList.add('picture_options');

    const saveButton = document.createElement('button');
    saveButton.textContent = 'download';
    saveButton.classList.add('picture_button');
    saveButton.addEventListener('click', () => {
      /* save the canvas as an image */
      const link = document.createElement('a');
      link.href = cvs.toDataURL();
      link.download = 'my_picture.png';
      link.click();
      /* close modal */
      cvsWrap.removeChild(modal);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'delete';
    deleteButton.classList.add('picture_button');
    deleteButton.addEventListener('click', () => {
      cvsWrap.removeChild(cvs);
      document.body.removeChild(modal);
    });

    const closeModal = document.createElement('button');
    closeModal.innerHTML = '&#x2715;';
    closeModal.classList.add('picture_modal_close');
    closeModal.addEventListener('click', () => {
      document.body.removeChild(modal);
    });

    options.appendChild(saveButton);
    options.appendChild(deleteButton);
    options.appendChild(closeModal);
    modal.appendChild(options);
    document.body.appendChild(modal);

  });



})