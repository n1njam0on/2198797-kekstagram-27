import './render.js';
import {renderBigPicture} from './bigpicture.js';

const pictureCollection = document.querySelectorAll('.picture');

pictureCollection.forEach((element) => {
  element.addEventListener('click', () => {
    const strArray = element.querySelector('img').src.split('/');
    const iden = strArray[strArray.length - 1 ].split('.');
    renderBigPicture(+iden[0]);
  });
});
