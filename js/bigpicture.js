import { similarCards } from './render.js';
import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

const onBigPictureEscKeydown = (evt) => {
  if(isEscapeKey(evt)){
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onBigPictureEscKeydown);
  }
};

const onBigPictureCloseButton = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  closeButton.removeEventListener('click', onBigPictureCloseButton);
};

export const renderBigPicture = (id) => {
  bigPicture.classList.remove('hidden');
  const photoData = similarCards.find((element) => element.id === id);

  bigPicture.querySelector('.big-picture__img').querySelector('img').src = photoData.url;
  bigPicture.querySelector('.likes-count').textContent = photoData.likes;
  bigPicture.querySelector('.comments-count').textContent = photoData.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photoData.description;

  const commentsBlock = bigPicture.querySelector('.social__comments');
  commentsBlock.innerHTML = '';
  const picturesFragment = document.createDocumentFragment();

  photoData.comments.forEach((element) => {
    const newLi = document.createElement('li');
    newLi.classList.add('social__comment');

    const avatar = document.createElement('img');
    avatar.classList.add('social__picture');
    avatar.src = element.avatar;
    avatar.alt = element.name;
    newLi.appendChild(avatar);

    const message = document.createElement('p');
    message.classList.add('social__text');
    message.textContent = element.message;
    newLi.appendChild(message);

    picturesFragment.appendChild(newLi);
  });
  commentsBlock.appendChild(picturesFragment);

  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');

  closeButton.addEventListener('click', onBigPictureCloseButton);
  document.addEventListener('keydown', onBigPictureEscKeydown);
};
