function getRandomNumber(min, max){
  if(min < 0 || max < 0 || min > max){
    return NaN;
  }
  return Math.random() * (max - min) + Number(min);
}


function getLengthCompare(str, maxLength){
  if(typeof maxLength !== 'number'){
    return NaN;
  }
  if(String(str).length <= maxLength){
    return true;
  }
  return false;
}

getRandomNumber(1,10);
getLengthCompare('Hello world!', 5);
