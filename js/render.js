import {CreateCardCollection} from './data.js';

const userPictureList = document.querySelector('.pictures');
const similarCardTemplate = document.querySelector('#picture').content.querySelector('a');

export const similarCards = CreateCardCollection();

const pictureListFragment = document.createDocumentFragment();

similarCards.forEach(({url, likes, comments}) => {
  const cardElement = similarCardTemplate.cloneNode(true);
  cardElement.querySelector('img').src = url;
  cardElement.querySelector('.picture__likes').textContent = likes;
  cardElement.querySelector('.picture__comments').textContent = comments.length;
  userPictureList.append(cardElement);
});

userPictureList.append(pictureListFragment);
