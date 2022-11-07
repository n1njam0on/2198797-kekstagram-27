import {renderBigPicture} from './big-picture.js';
import {fillImgUploadForm, initUploadForm} from './img-upload.js';
import {renderPhotos} from './render.js';
import {getData} from './api.js';

const errorElement = document.querySelector('#error').content.querySelector('section').cloneNode(true);

const showAlertMessage = (message) =>{
  errorElement.querySelector('.error__title').textContent = message;
  const reloadButton = errorElement.querySelector('.error__button');
  reloadButton.classList.add('hidden');
  document.querySelector('body').appendChild(errorElement);
};

getData((photos) => {
  renderPhotos(photos);
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


