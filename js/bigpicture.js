import { similarCards } from './render.js';
import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const uploadButton = bigPicture.querySelector('.comments-loader');
const commentsBlock = bigPicture.querySelector('.social__comments');

let commentsNumber = 0;
let commentsCounter = 0;
let tmpCommentsData = [];

const NUMBER_UPLOADED_COMMENTS = 5;


const uploadComments = () => {
  const picturesFragment = document.createDocumentFragment();
  for (let i = 0; i < NUMBER_UPLOADED_COMMENTS; i++){
    if (tmpCommentsData.length <= 0){
      break;
    }
    const data = tmpCommentsData.pop();

    const newLi = document.createElement('li');
    newLi.classList.add('social__comment');

    const avatar = document.createElement('img');
    avatar.classList.add('social__picture');
    avatar.src = data.avatar;
    avatar.alt = data.name;
    newLi.appendChild(avatar);

    const message = document.createElement('p');
    message.classList.add('social__text');
    message.textContent = data.message;
    newLi.appendChild(message);

    picturesFragment.appendChild(newLi);
    commentsCounter++;
  }
  bigPicture.querySelector('.social__comment-count').innerHTML = `${commentsCounter} из <span class="comments-count">${commentsNumber}</span> комментариев`;
  commentsBlock.appendChild(picturesFragment);
};

const onBigPictureEscKeydown = (evt) => {
  if(isEscapeKey(evt)){
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onBigPictureEscKeydown);
    uploadButton.removeEventListener('click', uploadComments);
  }
};

const onBigPictureCloseButton = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureEscKeydown);
  closeButton.removeEventListener('click', onBigPictureCloseButton);
  uploadButton.removeEventListener('click', uploadComments);
};


export const renderBigPicture = (id) => {
  bigPicture.classList.remove('hidden');
  const photoData = similarCards.find((element) => element.id === id);
  tmpCommentsData = photoData.comments.slice(0);
  commentsCounter = 0;

  bigPicture.querySelector('.big-picture__img').querySelector('img').src = photoData.url;
  bigPicture.querySelector('.likes-count').textContent = photoData.likes;
  commentsNumber = photoData.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photoData.description;

  commentsBlock.innerHTML = '';
  uploadComments();
  uploadButton.addEventListener('click', uploadComments);

  document.querySelector('body').classList.add('modal-open');

  closeButton.addEventListener('click', onBigPictureCloseButton);
  document.addEventListener('keydown', onBigPictureEscKeydown);
};
