function getRundomNumber(min, max){
    if(min < 0 || max < 0 || min > max){
        return NaN;
    }
    return Math.random() * (max - min) + Number(min);
}


function lengthCompare(str, maxLength){
    if(typeof maxLength !== 'number'){
        return NaN;
    }
    if(String(str).length <= maxLength){
        return true;
    }
    return false;
}
