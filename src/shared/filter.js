import Vue from "vue";
import { numberFormat, formatDate, numberConverter, numberToWords, capitalize } from '@/shared/utils';

Vue.filter('vNumberFormat', (number, decimals, dec_point, thousands_sep)  => {
    return numberFormat(number, decimals, dec_point, thousands_sep);
})

Vue.filter('vFormatDate', (date, formate = 'DD/MM/YYYY')  => {
    return formatDate(date, formate);
})

Vue.filter('vNumberConverter', (number = '1')  => {
    return numberConverter(number);
})
Vue.filter('vNumberToWords', (n, custom_join_character)  => {
    return numberToWords(n, custom_join_character);
})