import './render.js';
import {renderBigPicture} from './bigpicture.js';
import {filllImgUploadForm} from './imgupload.js';


const picturesContainer = document.querySelector('.pictures');

picturesContainer.addEventListener('click', (evt) => {
  if(evt.target.tagName === 'IMG'){
    const strArray = evt.target.src.split('/');
    const iden = strArray[strArray.length - 1 ].split('.');
    renderBigPicture(+iden[0]);
  }
});


const uploadStart = document.querySelector('.img-upload__label ');

uploadStart.addEventListener('click', () => {
  filllImgUploadForm();
});
