const errorElement = document.querySelector('#error').content.querySelector('section').cloneNode(true);

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

export const showAlertMessage = (message) =>{
  errorElement.querySelector('.error__title').textContent = message;
  const reloadButton = errorElement.querySelector('.error__button');
  reloadButton.classList.add('hidden');
  document.querySelector('body').appendChild(errorElement);
};
