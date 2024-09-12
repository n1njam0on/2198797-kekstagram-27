import { isEscapeKey, validationHashTag, initErrorUploadMessage, initSuccessSendMessage, showSuccessSendMessage, showErrorUploadMessage} from './util.js';
import { SLIDER_OPTIONS_FOR_CHROME, SLIDER_OPTIONS_FOR_SEPIA, SLIDER_OPTIONS_FOR_MARVIN, SLIDER_OPTIONS_FOR_PHOBOS, SLIDER_OPTIONS_FOR_HEAT } from './slider-options.js';
import { sendData } from './api.js';

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
const hashtagFieldNode = uploadFormNode.querySelector('.text__hashtags');
const inputFileNode = document.querySelector('.img-upload__input');
const effectLevelSliderNode = uploadFormNode.querySelector('.effect-level__slider');
const scaleControlSmallerNode = uploadFormNode.querySelector('.scale__control--smaller');
const scaleControlBiggerNode = uploadFormNode.querySelector('.scale__control--bigger');
const scaleControlValueNode = uploadFormNode.querySelector('.scale__control--value');
const imgUploadEffectsNode = uploadFormNode.querySelector('.img-upload__effects');
const imgUploadPreviewNode = uploadFormNode.querySelector('.img-upload__preview');
const effectLeveelValueNode = uploadFormNode.querySelector('.effect-level__value');
const submitButtonNode = uploadFormNode.querySelector('.img-upload__submit');

let isCommentHashtagFieldOnFocus = false;

const pristine = new Pristine(uploadFormNode,{
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

const validationCommentField = (value) => value.length <= COMMENT_MAX_LENGTH;

pristine.addValidator(hashtagFieldNode,
  validationHashTag,
  `${HASHTAG_LENGTH_ERROR_MESSAGE}, ${HASHTAG_CONTENT_ERROR_MESSAGE}`, 1, false);

pristine.addValidator(commentFieldNode,
  validationCommentField,
  COMMENT_ERROR_MESSAGE, 2, false);


const changeCommentHashtagFieldFocusStatus = () => {
  isCommentHashtagFieldOnFocus = isCommentHashtagFieldOnFocus ? isCommentHashtagFieldOnFocus = false : isCommentHashtagFieldOnFocus = true;
  return isCommentHashtagFieldOnFocus;
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
    effectLeveelValueNode.value = '';
    switch(evt.target.id) {
      case EFFECTS.CHROME:
        effectLevelSliderNode.noUiSlider.destroy();
        noUiSlider.create(effectLevelSliderNode, SLIDER_OPTIONS_FOR_CHROME);
        imgUploadPreviewNode.classList.add('effects__preview--chrome');
        effectLevelSliderNode.noUiSlider.on('update', () => {
          imgUploadPreviewNode.style.filter = `grayscale(${effectLevelSliderNode.noUiSlider.get()})`;
          effectLeveelValueNode.value = effectLevelSliderNode.noUiSlider.get();
        });
        break;
      case EFFECTS.SEPIA:
        effectLevelSliderNode.noUiSlider.destroy();
        noUiSlider.create(effectLevelSliderNode, SLIDER_OPTIONS_FOR_SEPIA);
        imgUploadPreviewNode.classList.add('effects__preview--sepia');
        effectLevelSliderNode.noUiSlider.on('update', () => {
          imgUploadPreviewNode.style.filter = `sepia(${effectLevelSliderNode.noUiSlider.get()})`;
          effectLeveelValueNode.value = effectLevelSliderNode.noUiSlider.get();
        });
        break;
      case EFFECTS.MARVIN:
        effectLevelSliderNode.noUiSlider.destroy();
        noUiSlider.create(effectLevelSliderNode, SLIDER_OPTIONS_FOR_MARVIN);
        imgUploadPreviewNode.classList.add('effects__preview--marvin');
        effectLevelSliderNode.noUiSlider.on('update', () => {
          imgUploadPreviewNode.style.filter = `invert(${effectLevelSliderNode.noUiSlider.get()}%)`;
          effectLeveelValueNode.value = effectLevelSliderNode.noUiSlider.get();
        });
        break;
      case EFFECTS.PHOBOS:
        effectLevelSliderNode.noUiSlider.destroy();
        noUiSlider.create(effectLevelSliderNode, SLIDER_OPTIONS_FOR_PHOBOS);
        imgUploadPreviewNode.classList.add('effects__preview--phobos');
        effectLevelSliderNode.noUiSlider.on('update', () => {
          imgUploadPreviewNode.style.filter = `blur(${effectLevelSliderNode.noUiSlider.get()}px)`;
          effectLeveelValueNode.value = effectLevelSliderNode.noUiSlider.get();
        });
        break;
      case EFFECTS.HEAT:
        effectLevelSliderNode.noUiSlider.destroy();
        noUiSlider.create(effectLevelSliderNode, SLIDER_OPTIONS_FOR_HEAT);
        imgUploadPreviewNode.classList.add('effects__preview--heat');
        effectLevelSliderNode.noUiSlider.on('update', () => {
          imgUploadPreviewNode.style.filter = `brightness(${effectLevelSliderNode.noUiSlider.get()})`;
          effectLeveelValueNode.value = effectLevelSliderNode.noUiSlider.get();
        });
        break;
      default:
        effectLevelSliderNode.classList.add('hidden');
    }
  }
};

const closeUploadForm = () => {
  uploadFormNode.reset();
  imageEditFormNode.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  imgUploadPreviewNode.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
  imgUploadPreviewNode.style.removeProperty('filter');
};

const onImgUploadEscKeydown = (evt) => {
  if(isEscapeKey(evt)){
    evt.preventDefault();
    if(!isCommentHashtagFieldOnFocus){
      inputFileNode.name = 'filename';
      document.removeEventListener('keydown', onImgUploadEscKeydown);
      closeUploadForm();
    }
  }
};

const onImgUploadCloseButton = () => {
  closeUploadForm();
};

const blockSubmitButton = () => {
  submitButtonNode.disable = true;
  submitButtonNode.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButtonNode.disable = true;
  submitButtonNode.textContent = 'Опубликовать';
};

const initUploadForm = () => {
  uploadFormNode.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          closeUploadForm();
          unblockSubmitButton();
          showSuccessSendMessage();
        },
        () => {
          showErrorUploadMessage();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });

  initSuccessSendMessage();
  initErrorUploadMessage();

  imgUploadEffectsNode.addEventListener('click', onImageEffectButtons);
  effectLevelSliderNode.classList.add('hidden');

  scaleControlSmallerNode.addEventListener('click', onScaleControlButtons);
  scaleControlBiggerNode.addEventListener('click', onScaleControlButtons);

  commentFieldNode.addEventListener('focus', changeCommentHashtagFieldFocusStatus);
  commentFieldNode.addEventListener('blur', changeCommentHashtagFieldFocusStatus);

  hashtagFieldNode.addEventListener('focus', changeCommentHashtagFieldFocusStatus);
  hashtagFieldNode.addEventListener('blur', changeCommentHashtagFieldFocusStatus);

  closeButtonNode.addEventListener('click', onImgUploadCloseButton);
  document.addEventListener('keydown', onImgUploadEscKeydown);
};

const fillImgUploadForm = () => {
  document.querySelector('body').classList.add('modal-open');
  const file = inputFileNode.files[0];
  imgUploadPreviewNode.querySelector('img').src = URL.createObjectURL(file);
  imageEditFormNode.classList.remove('hidden');
  if(effectLevelSliderNode.noUiSlider){
    effectLevelSliderNode.noUiSlider.destroy();
  }
  noUiSlider.create(effectLevelSliderNode, SLIDER_OPTIONS_FOR_CHROME);

  scaleControlValueNode.value = '100%';

  document.addEventListener('keydown', onImgUploadEscKeydown);

};


export {initUploadForm, fillImgUploadForm};
