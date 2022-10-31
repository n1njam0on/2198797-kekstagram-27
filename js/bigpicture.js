import { similarCards } from './render.js';
import { isEscapeKey } from './util.js';

const NUMBER_UPLOADED_COMMENTS = 5;

const bigPictureNode = document.querySelector('.big-picture');
const closeButtonNode = bigPictureNode.querySelector('.big-picture__cancel');
const uploadButtonNode = bigPictureNode.querySelector('.comments-loader');
const commentsBlockNode = bigPictureNode.querySelector('.social__comments');

let commentsNumber = 0;
let commentsCounter = 0;
let tmpCommentsData = [];

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
  bigPictureNode.querySelector('.social__comment-count').innerHTML = `${commentsCounter} из <span class="comments-count">${commentsNumber}</span> комментариев`;
  commentsBlockNode.appendChild(picturesFragment);
};

const onBigPictureEscKeydown = (evt) => {
  if(isEscapeKey(evt)){
    evt.preventDefault();
    bigPictureNode.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onBigPictureEscKeydown);
    uploadButtonNode.removeEventListener('click', uploadComments);
  }
};

const onBigPictureCloseButton = () => {
  bigPictureNode.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureEscKeydown);
  closeButtonNode.removeEventListener('click', onBigPictureCloseButton);
  uploadButtonNode.removeEventListener('click', uploadComments);
};


export const renderBigPicture = (id) => {
  bigPictureNode.classList.remove('hidden');
  const photoData = similarCards.find((element) => element.id === id);
  tmpCommentsData = photoData.comments.slice(0);
  commentsCounter = 0;

  bigPictureNode.querySelector('.big-picture__img').querySelector('img').src = photoData.url;
  bigPictureNode.querySelector('.likes-count').textContent = photoData.likes;
  commentsNumber = photoData.comments.length;
  bigPictureNode.querySelector('.social__caption').textContent = photoData.description;

  commentsBlockNode.innerHTML = '';
  uploadComments();
  uploadButtonNode.addEventListener('click', uploadComments);

  document.querySelector('body').classList.add('modal-open');

  closeButtonNode.addEventListener('click', onBigPictureCloseButton);
  document.addEventListener('keydown', onBigPictureEscKeydown);
};
