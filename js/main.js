import './render.js';
import {renderBigPicture} from './big-picture.js';
import {filllImgUploadForm} from './img-upload.js';


const picturesContainerNode = document.querySelector('.pictures');

picturesContainerNode.addEventListener('click', (evt) => {
  if(evt.target.tagName === 'IMG'){
    const strArray = evt.target.src.split('/');
    const iden = strArray[strArray.length - 1 ].split('.');
    renderBigPicture(+iden[0]);
  }
});


const uploadStartNode = document.querySelector('.img-upload__label ');

uploadStartNode.addEventListener('click', () => {
  filllImgUploadForm();
});
