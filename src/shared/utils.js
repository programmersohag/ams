import moment from 'moment';
import store from '@/store';
import countries from '@/shared/countries.js';

const axios = require('axios');

export function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const finalEnlishToBanglaNumber = {
  '0': '০',
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯'
};

String.prototype.englishToBangla = function () {
  let retStr = this;
  for (const x in finalEnlishToBanglaNumber) {
    retStr = retStr.replace(new RegExp(x, 'g'), finalEnlishToBanglaNumber[x]);
  }
  return retStr;
};

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

export const getShortNumber = (b = 0) => {
  let r = 0;
  let is_value = true;
  //console.log('b='+b);
  if (!b && isNaN(b)) {
    return 0;
  }
  if (b < 0) {
    b = Math.abs(b);
    is_value = false;
  }
  if (b < 1000) {
    r = Math.round(b) + '';
  } else if (b >= 1000 && b < 1000000) {
    r = Math.round(b / 1000) + ' K';
  } else {
    r = Math.round(b / 1000000) + ' M';
  }
  if (!is_value) {
    r = '-' + r
  }
  return r;
}
export const genderLongName = (short_name = '') => {
  let gender = 'Both';
  if (short_name == 'M') {
    gender = 'Male';
  } else if (short_name == 'F') {
    gender = 'Female';
  }
  return gender;
}

/*export const formatDate = (date, formate = 'DD/MM/YYYY') => {
  let date_formate = '';
  if (date) {
    date_formate = moment(date).format(formate);
  }
  return date_formate;
}*/

export const formatDate = (stringDate, format = 'DD-MM-YYYY') => {
  let date_format = '';
  if (stringDate) {
    date_format = moment(stringDate, 'YYYY-MM-DD').format(format);
  }
  return date_format;
}
export const formatMonth = (stringDate, format = 'MMM-YYYY') => {
  let date_format = '';
  if (stringDate) {
    date_format = moment(stringDate, 'YYYY-MM-DD').format(format);
  }
  return date_format;
}
export const getCurrentDateWithFormat = (format = 'DD-MM-YYYY') => {
  return moment().format(format);
}

export const calculateDateDiff = (endStringDate, startStringDate) => {
  let count;
  if (endStringDate && startStringDate) {
    count = moment(endStringDate, 'DD-MM-YYYY').diff(moment(startStringDate, 'DD-MM-YYYY'), 'days') + 1;
  }
  return count;
}

export const getShortMonthName = () => {
  return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
}

export const numberFormat = (number, decimals, dec_point, thousands_sep) => {
  // Strip all characters but numerical ones.
  var number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}


export async function imageLoad(fileInfo, docType) {
  const params = fileInfo;
  let base64Img = "data:image/png;base64,";
  if (docType) {
    base64Img = `data:${docType};base64, `;
  }

  let headers = {
    headers: {
      'Authorization': 'Bearer 4d4ceb93-47ad-48c2-8372-1fc981af66cf',
      'Content-Type': 'application/json'
    }
  }

  let url = 'http://192.168.1.97:8765/filemanager-service/downloads/';
  return await axios.post(url, JSON.stringify(params), headers).then(response => {
    if (response.data.code === 200) {
      return base64Img + response.data.data;
    }
  });
}


export const dateFormatAMPM = (date) => {
  let dt = new Date(date);
  var hours = dt.getHours();
  var minutes = dt.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

export const changeDateISOFormatToString = (date) => {
  var givenDate = new Date(date);
  let dt = new Date(givenDate.toDateString()); //ISO Date Format
  return dt;
}

export const dayDifferencedateBetweenDates = (date) => {
  const date1 = new Date();
  const date2 = new Date(date);
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export const getMessageCreateDate = (givendate) => {
  let dayTime = dateFormatAMPM(givendate);
  let dayDiff = dayDifferencedateBetweenDates(givendate);
  let messageDate = '';
  let dayArray = {1: 'Today', 2: 'Yestarday', 3: '2 days ago', 4: '3 days ago', 5: '4 days ago'};
  if (dayArray[dayDiff]) {
    messageDate += (dayArray[dayDiff] + ' ' + dayTime);
  } else {
    messageDate += (formatDate(givendate) + ' ' + dayTime);
  }
  return messageDate;
}

export const numberConverter = (number) => {
  let lan = store.getters['auth/userInfo'].default_language;
  if (lan == "bengali") {
    return number.toString().englishToBangla();
  } else {
    return number;
  }
}

export const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const numberToWords = (n, custom_join_character) => {

  var string = n.toString(),
    units, tens, scales, start, end, chunks, chunksLen, chunk, ints, i, word, words;

  var and = custom_join_character || 'and';

  /* Is number zero? */
  if (parseInt(string) === 0) {
    return 'zero';
  }

  /* Array of units as words */
  units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

  /* Array of tens as words */
  tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

  /* Array of scales as words */
  scales = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quatttuor-decillion', 'quindecillion', 'sexdecillion', 'septen-decillion', 'octodecillion', 'novemdecillion', 'vigintillion', 'centillion'];

  /* Split user arguemnt into 3 digit chunks from right to left */
  start = string.length;
  chunks = [];
  while (start > 0) {
    end = start;
    chunks.push(string.slice((start = Math.max(0, start - 3)), end));
  }

  /* Check if function has enough scale words to be able to stringify the user argument */
  chunksLen = chunks.length;
  if (chunksLen > scales.length) {
    return '';
  }

  /* Stringify each integer in each chunk */
  words = [];
  for (i = 0; i < chunksLen; i++) {

    chunk = parseInt(chunks[i]);

    if (chunk) {

      /* Split chunk into array of individual integers */
      ints = chunks[i].split('').reverse().map(parseFloat);

      /* If tens integer is 1, i.e. 10, then add 10 to units integer */
      if (ints[1] === 1) {
        ints[0] += 10;
      }

      /* Add scale word if chunk is not zero and array item exists */
      if ((word = scales[i])) {
        words.push(word);
      }

      /* Add unit word if array item exists */
      if ((word = units[ints[0]])) {
        words.push(word);
      }

      /* Add tens word if array item exists */
      if ((word = tens[ints[1]])) {
        words.push(word);
      }

      /* Add 'and' string after units or tens integer if: */
      if (ints[0] || ints[1]) {

        /* Chunk has a hundreds integer or chunk is the first of multiple chunks */
        if (ints[2] || !i && chunksLen) {
          words.push(and);
        }

      }

      /* Add hundreds word if array item exists */
      if ((word = units[ints[2]])) {
        words.push(word + ' hundred');
      }

    }

  }
  return words.reverse().join(' ');
}

export const getMfiNameByUrl = () => {
  let mfi_name = (window.location.pathname.replace(/[^\w\s]/gi, '').trim()).split('_');
  mfi_name = mfi_name[0];
  return mfi_name;
}

export const getMonths = (isSelect = false, selectName = '') => {
  let map = new Map()
  if (isSelect) {
    map.set('', selectName ? selectName : "---Select---")
  }
  map.set('01', "January")
  map.set('02', "February")
  map.set('03', "March")
  map.set('04', "April")
  map.set('05', "May")
  map.set('06', "June")
  map.set('07', "July")
  map.set('08', "August")
  map.set('09', "September")
  map.set('10', "October")
  map.set('11', "November")
  map.set('12', "December")
  return map;
}

export const getCountries = (isSelect = false, selectName = '') => {
  let map = new Map();
  if (isSelect) {
    map.set('', selectName ? selectName : "---Select---");
  }
  countries.map((val, index) => {
    map.set(val.name, val.name);
  });
  return map;
}
