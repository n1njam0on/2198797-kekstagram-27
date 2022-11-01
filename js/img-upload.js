import { isEscapeKey, validHashTag } from './util.js';
import { SLIDER_OPTIONS_FOR_CHROME, SLIDER_OPTIONS_FOR_SEPIA, SLIDER_OPTIONS_FOR_MARVIN, SLIDER_OPTIONS_FOR_PHOBOS, SLIDER_OPTIONS_FOR_HEAT } from './slider-options.js';

const COMMENT_MAX_LENGTH = 140;
const HASHTAG_LENGTH_ERROR_MESSAGE = 'хэштег должен быть длиной от 1 до 19 символов';
const HASHTAG_CONTENT_ERROR_MESSAGE = 'начинаться с символа #, содержать только букы и цифры';
const COMMENT_ERROR_MESSAGE = 'длина комментария не должна привышать 140 символов';
const STEP_IMAGE_SCALE = 25;
const MIN_IMAGE_SCALE = 25;
const MAX_IMAGE_SCALE = 100;

const EFFECTS = {
  CHROME: 'effect-chrome',
  SEPIA: 'effect-sepia',
  MARVIN: 'effect-marvin',
  PHOBOS: 'effect-phobos',
  HEAT: 'effect-heat'
};

const uploadFormNode = document.querySelector('.img-upload__form');
const imageEditFormNode = document.querySelector('.img-upload__overlay');
const closeButtonNode = uploadFormNode.querySelector('.img-upload__cancel');
const commentFieldNode = uploadFormNode.querySelector('.text__description');
const inputFileNode = document.querySelector('.img-upload__input');
const effectLevelSliderNode = uploadFormNode.querySelector('.effect-level__slider');
const scaleControlSmallerNode = uploadFormNode.querySelector('.scale__control--smaller');
const scaleControlBiggerNode = uploadFormNode.querySelector('.scale__control--bigger');
const scaleControlValueNode = uploadFormNode.querySelector('.scale__control--value');
const imgUploadEffectsNode = uploadFormNode.querySelector('.img-upload__effects');
const imgUploadPreviewNode = uploadFormNode.querySelector('.img-upload__preview');


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

const onScaleControlButtons = (evt) => {
  let currentValue = parseInt(scaleControlValueNode.value, 10);
  if(evt.target.matches('.scale__control--smaller')){
    if(currentValue > MIN_IMAGE_SCALE){
      currentValue -= STEP_IMAGE_SCALE;
    }
  }
  if(evt.target.matches('.scale__control--bigger')){
    if(currentValue < MAX_IMAGE_SCALE){
      currentValue += STEP_IMAGE_SCALE;
    }
  }
  scaleControlValueNode.value = `${currentValue}%`;
  imgUploadPreviewNode.style.transform = `scale(${currentValue / MAX_IMAGE_SCALE})`;
};

const onImageEffectButtons = (evt) => {
  if(evt.target.matches('input[type = "radio"]')){
    imgUploadPreviewNode.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
    imgUploadPreviewNode.style.removeProperty('filter');
    effectLevelSliderNode.classList.remove('hidden');
    switch(evt.target.id) {
      case EFFECTS.CHROME:
        effectLevelSliderNode.noUiSlider.destroy();
        noUiSlider.create(effectLevelSliderNode, SLIDER_OPTIONS_FOR_CHROME);
        imgUploadPreviewNode.classList.add('effects__preview--chrome');
        effectLevelSliderNode.noUiSlider.on('update', () => {
          imgUploadPreviewNode.style.filter = `grayscale(${effectLevelSliderNode.noUiSlider.get()})`;
        });
        break;
      case EFFECTS.SEPIA:
        effectLevelSliderNode.noUiSlider.destroy();
        noUiSlider.create(effectLevelSliderNode, SLIDER_OPTIONS_FOR_SEPIA);
        imgUploadPreviewNode.classList.add('effects__preview--sepia');
        effectLevelSliderNode.noUiSlider.on('update', () => {
          imgUploadPreviewNode.style.filter = `sepia(${effectLevelSliderNode.noUiSlider.get()})`;
        });
        break;
      case EFFECTS.MARVIN:
        effectLevelSliderNode.noUiSlider.destroy();
        noUiSlider.create(effectLevelSliderNode, SLIDER_OPTIONS_FOR_MARVIN);
        imgUploadPreviewNode.classList.add('effects__preview--marvin');
        effectLevelSliderNode.noUiSlider.on('update', () => {
          imgUploadPreviewNode.style.filter = `invert(${effectLevelSliderNode.noUiSlider.get()}%)`;
        });
        break;
      case EFFECTS.PHOBOS:
        effectLevelSliderNode.noUiSlider.destroy();
        noUiSlider.create(effectLevelSliderNode, SLIDER_OPTIONS_FOR_PHOBOS);
        imgUploadPreviewNode.classList.add('effects__preview--phobos');
        effectLevelSliderNode.noUiSlider.on('update', () => {
          imgUploadPreviewNode.style.filter = `blur(${effectLevelSliderNode.noUiSlider.get()}px)`;
        });
        break;
      case EFFECTS.HEAT:
        effectLevelSliderNode.noUiSlider.destroy();
        noUiSlider.create(effectLevelSliderNode, SLIDER_OPTIONS_FOR_HEAT);
        imgUploadPreviewNode.classList.add('effects__preview--heat');
        effectLevelSliderNode.noUiSlider.on('update', () => {
          imgUploadPreviewNode.style.filter = `brightness(${effectLevelSliderNode.noUiSlider.get()})`;
        });
        break;
      default:
        effectLevelSliderNode.classList.add('hidden');
    }
  }
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
      scaleControlSmallerNode.removeEventListener('click', onScaleControlButtons);
      scaleControlBiggerNode.removeEventListener('click', onScaleControlButtons);
      imgUploadEffectsNode.removeEventListener('click', onImageEffectButtons);

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
  scaleControlSmallerNode.removeEventListener('click', onScaleControlButtons);
  scaleControlBiggerNode.removeEventListener('click', onScaleControlButtons);
  imgUploadEffectsNode.removeEventListener('click', onImageEffectButtons);
};


export const filllImgUploadForm = () => {

  inputFileNode.addEventListener('change', () => {
    imageEditFormNode.classList.remove('hidden');

    uploadFormNode.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    imgUploadEffectsNode.addEventListener('click', onImageEffectButtons);
    effectLevelSliderNode.classList.add('hidden');
    noUiSlider.create(effectLevelSliderNode, SLIDER_OPTIONS_FOR_CHROME);


    scaleControlValueNode.value = '100%';
    scaleControlSmallerNode.addEventListener('click', onScaleControlButtons);
    scaleControlBiggerNode.addEventListener('click', onScaleControlButtons);

    commentFieldNode.addEventListener('focus', changeCommentFieldFocusStatus);
    commentFieldNode.addEventListener('blur', changeCommentFieldFocusStatus);

    closeButtonNode.addEventListener('click', onImgUploadCloseButton);
    document.addEventListener('keydown', onImgUploadEscKeydown);
  });

};
