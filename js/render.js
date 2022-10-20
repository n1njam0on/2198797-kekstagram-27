import { getPhotoCollection } from './data.js';

const pictureContainer = document.querySelector('.pictures');
const randomUserPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const photoCollection = getPhotoCollection();

const picturesFragment = document.createDocumentFragment();

photoCollection.forEach(({url, likes, comments}) => {
  const clonePictureTemplate = randomUserPictureTemplate.cloneNode(true);

  clonePictureTemplate.querySelector('.picture__img').src = url;

  const likesTxt = document.createTextNode(likes);
  clonePictureTemplate.querySelector('.picture__likes').appendChild(likesTxt);


  const commentsTxt = document.createTextNode(comments.length);
  clonePictureTemplate.querySelector('.picture__comments').appendChild(commentsTxt);


  picturesFragment.appendChild(clonePictureTemplate);
});

pictureContainer.appendChild(picturesFragment);

