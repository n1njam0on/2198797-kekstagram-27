const HASHTAG_LENGTH_FOR_DEFAULT_VALUE = 1;
const MAX_HASHTAGS_AMOUNT = 5;

const bodyNode = document.querySelector('body');
const errorNode = document.querySelector('#error').content.querySelector('section').cloneNode(true);
const successSendNode = document.querySelector('#success').content.querySelector('section');
const errorSendNode = document.querySelector('#error').content.querySelector('section');

export const getRandomPositiveInteger = (a, b) => {
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomPositiveInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomPositiveInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

export const comparePhotos = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

export const isEscapeKey = (evt) => evt.key === 'Escape';

export const validationHashTag = (value) => {
  const hashtagsList = value.split(/\s+/);
  const hashtagCondition = /^#[a-zа-я0-9]{1,19}$/i;
  if(hashtagsList[0] === '' && hashtagsList.length === HASHTAG_LENGTH_FOR_DEFAULT_VALUE){
    return true;
  }
  for (let i = 0; i < hashtagsList.length - 1; i++){
    if(hashtagsList[hashtagsList.length - 1].toLowerCase() === hashtagsList[i].toLowerCase()){
      return false;
    }
  }
  if(hashtagsList.length > MAX_HASHTAGS_AMOUNT){
    return false;
  }
  for (let i = 0; i < hashtagsList.length; i++){
    if(!hashtagCondition.test(hashtagsList[i])){
      return false;
    }
  }
  return true;
};

export const showAlertMessage = (message) =>{
  errorNode.querySelector('.error__title').textContent = message;
  const reloadButton = errorNode.querySelector('.error__button');
  reloadButton.classList.add('hidden');
  document.querySelector('body').appendChild(errorNode);
};

export const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export const initSuccessSendMessage = () => {
  bodyNode.appendChild(successSendNode);
  successSendNode.classList.add('hidden');
  const successButton = successSendNode.querySelector('button');
  successButton.addEventListener('click', () => {
    successSendNode.classList.add('hidden');
  });
  document.addEventListener('keydown', (evt) => {
    if(isEscapeKey(evt)){
      evt.preventDefault();
      successSendNode.classList.add('hidden');
    }
  });
  document.addEventListener('click', (evt) => {
    if(!successSendNode.querySelector('div').contains(evt.target)){
      successSendNode.classList.add('hidden');
    }
  });
};

export const initErrorUploadMessage = () =>{
  bodyNode.appendChild(errorSendNode);
  errorSendNode.classList.add('hidden');
  const reloadButton = errorSendNode.querySelector('button');
  reloadButton.addEventListener('click', () => {
    errorSendNode.classList.add('hidden');
  });
  document.addEventListener('keydown', (evt) => {
    if(isEscapeKey(evt)){
      evt.preventDefault();
      errorSendNode.classList.add('hidden');
    }
  });
  document.addEventListener('click', (evt) => {
    if(!errorSendNode.querySelector('div').contains(evt.target)){
      errorSendNode.classList.add('hidden');
    }
  });
};


export const showSuccessSendMessage = () => {
  successSendNode.classList.remove('hidden');
};

export const showErrorUploadMessage = () => {
  errorSendNode.classList.remove('hidden');
};
