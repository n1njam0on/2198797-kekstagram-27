import { isEscapeKey, validHashTag } from './util.js';

const COMMENT_MAX_LENGTH = 140;
const HASHTAG_LENGTH_ERROR_MESSAGE = 'хэштег должен быть длиной от 1 до 19 символов';
const HASHTAG_CONTENT_ERROR_MESSAGE = 'начинаться с символа #, содержать только букы и цифры';
const COMMENT_ERROR_MESSAGE = 'длина комментария не должна привышать 140 символов';

const uploadFormNode = document.querySelector('.img-upload__form');
const imageEditFormNode = document.querySelector('.img-upload__overlay');
const closeButtonNode = uploadFormNode.querySelector('.img-upload__cancel');
const commentFieldNode = uploadFormNode.querySelector('.text__description');
const inputFileNode = document.querySelector('.img-upload__input');

let isCommentFieldOnFocus = false;

const pristine = new Pristine(uploadFormNode,{
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});


const validCommentField = (value) => value.length <= COMMENT_MAX_LENGTH;

pristine.addValidator(uploadFormNode.querySelector('.text__hashtags'),
  validHashTag,
  `${HASHTAG_LENGTH_ERROR_MESSAGE}, ${HASHTAG_CONTENT_ERROR_MESSAGE}`, 1, false);

pristine.addValidator(uploadFormNode.querySelector('.text__description'),
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
      inputFileNode.name = 'filename';
      uploadFormNode.reset();
      imageEditFormNode.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
      document.removeEventListener('keydown', onImgUploadEscKeydown);
      commentFieldNode.removeEventListener('focus', changeCommentFieldFocusStatus);
      commentFieldNode.removeEventListener('blur', changeCommentFieldFocusStatus);

    }
  }
};

const onImgUploadCloseButton = () => {
  uploadFormNode.reset();
  imageEditFormNode.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  imageEditFormNode.removeEventListener('click', onImgUploadCloseButton);
  commentFieldNode.removeEventListener('focus', changeCommentFieldFocusStatus);
  commentFieldNode.removeEventListener('blur', changeCommentFieldFocusStatus);
};


export const filllImgUploadForm = () => {

  inputFileNode.addEventListener('change', () => {
    imageEditFormNode.classList.remove('hidden');


    uploadFormNode.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    commentFieldNode.addEventListener('focus', changeCommentFieldFocusStatus);
    commentFieldNode.addEventListener('blur', changeCommentFieldFocusStatus);

    closeButtonNode.addEventListener('click', onImgUploadCloseButton);
    document.addEventListener('keydown', onImgUploadEscKeydown);
  });

};
