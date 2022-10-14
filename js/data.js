import { getRandomPositiveInteger } from './util.js';

const PHOTOS_NUMBER = 25;

const getUniqNumberArray = (arraySize = PHOTOS_NUMBER, maxNumber = PHOTOS_NUMBER) => {
    if(arraySize > maxNumber){
      const temp = arraySize;
      arraySize = maxNumber;
      maxNumber = temp;
    }
    const idSet = new Set();
  
    while(idSet.size < arraySize){
      idSet.add(getRandomPositiveInteger(1, maxNumber));
    }
    const idArray = [];
    idSet.forEach((value) => idArray.push(value));
    return idArray;
  };

const MESSAGES = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  
  const NAMES = [
    'Константин',
    'Игорь',
    'Васген',
    'Драгица',
    'Люк',
    'Лея',
    'Гарри',
    'Уил',
    'Гермиона',
  ];
  
  
  const MESSAGE_ID_ARRAY = getUniqNumberArray(PHOTOS_NUMBER, 1000);
  const PHOTO_ID_ARRAY = getUniqNumberArray();
  
  
  const getComment = () => {
    let message = Array.from({length:getRandomPositiveInteger(1, 2)}, () => MESSAGES[getRandomPositiveInteger(0, MESSAGES.length - 1)]).join('\n');
    return{
      id: MESSAGE_ID_ARRAY.pop(),
      avatar: `img/avatar-${getRandomPositiveInteger(0, 6)}.svg`,
      message: message,
      name: NAMES[getRandomPositiveInteger(0, NAMES.length - 1)],
    };
  };
  
  
  const getPhotoInfo = () => {
    const id = PHOTO_ID_ARRAY.pop();
    return {
      id: id,
      url: `photos/${id}.jpg`,
      description: `Фотография №${id} `,
      likes: getRandomPositiveInteger(15,100),
      comments: getComment(),
    };
  };

export const photoCollection = Array.from({length: PHOTOS_NUMBER}, getPhotoInfo);


