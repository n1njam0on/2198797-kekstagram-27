import { isEscapeKey, validHashTag } from './util.js';

const COMMENT_MAX_LENGTH = 140;
const HASHTAG_LENGTH_ERROR_MESSAGE = 'хэштег должен быть длиной от 1 до 19 символов';
const HASHTAG_CONTENT_ERROR_MESSAGE = 'начинаться с символа #, содержать только букы и цифры';
const COMMENT_ERROR_MESSAGE = 'длина комментария не должна привышать 140 символов';

const uploadForm = document.querySelector('.img-upload__form');
const imageEditForm = document.querySelector('.img-upload__overlay');
const closeButton = uploadForm.querySelector('.img-upload__cancel');
const commentField = uploadForm.querySelector('.text__description');
const inputFile = document.querySelector('.img-upload__input');

let isCommentFieldOnFocus = false;

const pristine = new Pristine(uploadForm,{
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});


const validCommentField = (value) => value.length <= COMMENT_MAX_LENGTH;

pristine.addValidator(uploadForm.querySelector('.text__hashtags'),
  validHashTag,
  `${HASHTAG_LENGTH_ERROR_MESSAGE}, ${HASHTAG_CONTENT_ERROR_MESSAGE}`, 1, false);

pristine.addValidator(uploadForm.querySelector('.text__description'),
  validCommentField,
  COMMENT_ERROR_MESSAGE, 2, false);


const changeCommentFieldFocusStatus = () => {
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
      commentField.removeEventListener('focus', changeCommentFieldFocusStatus);
      commentField.removeEventListener('blur', changeCommentFieldFocusStatus);

    }
  }
};

const onImgUploadCloseButton = () => {
  uploadForm.reset();
  imageEditForm.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  imageEditForm.removeEventListener('click', onImgUploadCloseButton);
  commentField.removeEventListener('focus', changeCommentFieldFocusStatus);
  commentField.removeEventListener('blur', changeCommentFieldFocusStatus);
};


export const filllImgUploadForm = () => {

  inputFile.addEventListener('change', () => {
    imageEditForm.classList.remove('hidden');


    uploadForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    commentField.addEventListener('focus', changeCommentFieldFocusStatus);
    commentField.addEventListener('blur', changeCommentFieldFocusStatus);

    closeButton.addEventListener('click', onImgUploadCloseButton);
    document.addEventListener('keydown', onImgUploadEscKeydown);
  });

};
