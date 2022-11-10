import {showAlertMessage, debounce} from './util.js';
import {renderBigPicture} from './big-picture.js';
import {fillImgUploadForm, initUploadForm} from './img-upload.js';
import {getData} from './api.js';
import {initDefaultFilter} from './image-filter.js';
import {renderPhotos} from './render.js';

const RERENDER_DELAY = 500;

getData((photos) => {
  renderPhotos(photos);
  initDefaultFilter(debounce(() => renderPhotos(photos), RERENDER_DELAY));
},
() => {
  showAlertMessage('Не удалось загрузить данные от сервера');
});

const picturesContainerNode = document.querySelector('.pictures');

picturesContainerNode.addEventListener('click', (evt) => {
  if(evt.target.tagName === 'IMG'){
    const strArray = evt.target.src.split('/');
    const iden = strArray[strArray.length - 1 ].split('.');
    renderBigPicture(+iden[0]);
  }
});

initUploadForm();
const uploadStartNode = document.querySelector('.img-upload__label ');
const inputFileNode = document.querySelector('.img-upload__input');
uploadStartNode.addEventListener('click', () => {
  inputFileNode .addEventListener('change', fillImgUploadForm);
});


