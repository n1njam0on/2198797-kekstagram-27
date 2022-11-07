export const getRandomPositiveInteger = (a, b) => {
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};


export const getLengthCompare = (str, maxLength) => {
  if(typeof maxLength !== 'number'){
    return NaN;
  }

  return String(str).length <= maxLength;
};

export const isEscapeKey = (evt) => evt.key === 'Escape';

export const validHashTag = (value) => {
  const hashtagsList = value.split(/(?=#)/g);
  const hashtagCondition = /^#[a-zа-я0-9]{1,19}$/i;
  if(hashtagsList[0] === ''){
    return true;
  }
  for (let i = 0; i < hashtagsList.length; i++){
    if(!hashtagCondition.test(hashtagsList[i])){
      return false;
    }
  }
  return true;
};


