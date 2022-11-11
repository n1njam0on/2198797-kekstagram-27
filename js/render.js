import {createRandomIdFromRangeGenerator, comparePhotos} from './util.js';

const MAX_RANDOM_NUMBER = 24;
const MIN_RANDOM_NUMBER = 0;
const AMOUNT_RANDOM_PHOTOS = 10;
const PHOTO_FILTERS = {
  RANDOM_FILTER: 'filter-random',
  MOST_DISCUSSED_FILTER: 'filter-discussed',
};

const userPictureListNode = document.querySelector('.pictures');
const similarCardTemplateNode = document.querySelector('#picture').content.querySelector('a');
let similarCards = [];

export const getSimilarCards = () => similarCards;

const getFilteredPhoto = (photos) => {
  const randomPhotos = photos.slice();
  const activeFilterNode = document.querySelector('.img-filters__button--active');
  similarCards = [];
  switch(activeFilterNode.id) {
    case PHOTO_FILTERS.RANDOM_FILTER:{
      const generatePhotoId = createRandomIdFromRangeGenerator(MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER );
      for (let i = 0; i < AMOUNT_RANDOM_PHOTOS; i++){
        similarCards.push(photos[generatePhotoId()]);
      }
      break;
    }
    case PHOTO_FILTERS.MOST_DISCUSSED_FILTER:{
      similarCards = randomPhotos.sort(comparePhotos);
      break;
    }
    default:
      similarCards = randomPhotos;
  }

};

export const renderPhotos = (photos) => {

  getFilteredPhoto(photos);

  const list = userPictureListNode.querySelectorAll('.picture');
  list.forEach((elem) => elem.parentNode.removeChild(elem));

  const pictureListFragment = document.createDocumentFragment();
  similarCards.forEach(({url, likes, comments}) => {
    const cardElement = similarCardTemplateNode.cloneNode(true);
    cardElement.querySelector('img').src = url;
    cardElement.querySelector('.picture__likes').textContent = likes;
    cardElement.querySelector('.picture__comments').textContent = comments.length;
    pictureListFragment.append(cardElement);
  });

  userPictureListNode.append(pictureListFragment);
};


