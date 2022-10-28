import { isEscapeKey } from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const imageEditForm = document.querySelector('.img-upload__overlay');
const closeButton = uploadForm.querySelector('.img-upload__cancel');
const commentField = uploadForm.querySelector('.text__description');
const inputFile = document.querySelector('.img-upload__input');

let isCommentFieldOnFocus = false;

const pristine = new Pristine(uploadForm,{
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--invalid',
  successClass: 'img-upload__text--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__text__error'
});

const validHashTag = (value) => {
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

const validCommentField = (value) => value.length <= 140;

pristine.addValidator(uploadForm.querySelector('.text__hashtags'),
  validHashTag,
  'Хэштег должен быть длиной от 1 до 19 символов, начинаться с символа #, содержать только букы и цифры', 1, false);

pristine.addValidator(uploadForm.querySelector('.text__description'),
  validCommentField,
  'Длина комментария не должна привышать 140 символов', 2, false);


const setCommentFieldFocusStatus = () => {
  isCommentFieldOnFocus = isCommentFieldOnFocus ? isCommentFieldOnFocus = false : isCommentFieldOnFocus = true;
  return isCommentFieldOnFocus;
};

const onImgUploadEscKeydown = (evt) => {
  if(isEscapeKey(evt)){
    evt.preventDefault();
    if(!isCommentFieldOnFocus){
      inputFile.name = 'filename';
      uploadForm.reset();
      imageEditForm.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
      document.removeEventListener('keydown', onImgUploadEscKeydown);
      commentField.removeEventListener('focus', setCommentFieldFocusStatus);
      commentField.removeEventListener('blur', setCommentFieldFocusStatus);

    }
  }
};

const onImgUploadCloseButton = () => {
  uploadForm.reset();
  imageEditForm.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  imageEditForm.removeEventListener('click', onImgUploadCloseButton);
  commentField.removeEventListener('focus', setCommentFieldFocusStatus);
  commentField.removeEventListener('blur', setCommentFieldFocusStatus);
};


export const filllImgUploadForm = () => {

  inputFile.addEventListener('change', () => {
    imageEditForm.classList.remove('hidden');


    uploadForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    commentField.addEventListener('focus', setCommentFieldFocusStatus);
    commentField.addEventListener('blur', setCommentFieldFocusStatus);

    closeButton.addEventListener('click', onImgUploadCloseButton);
    document.addEventListener('keydown', onImgUploadEscKeydown);
  });

};
