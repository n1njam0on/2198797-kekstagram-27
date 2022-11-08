const GET_DATA_ADRESS = 'https://27.javascript.pages.academy/kekstagram/data';
const SEND_DATA_ADRESS = 'https://27.javascript.pages.academy/kekstagram';

const getData = (onSuccess, onFail) => {
  fetch(GET_DATA_ADRESS)
    .then((response) => {
      if(response.ok){
        return response.json();
      }else{
        onFail();
      }
    }
    )
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      onFail();
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    SEND_DATA_ADRESS,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
