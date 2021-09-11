import VueI18n from 'vue-i18n';
import Vue from 'vue';
import { LAN } from '@/shared/lan/language';
import axios from 'axios';
import store from '@/store/index'

Vue.use(VueI18n);
let user_info = store.getters['auth/userInfo'];
let _lan = (user_info["lan"] != undefined) ? user_info["lan"] : "en";

export const i18n = new VueI18n({
    locale: _lan,
    fallbackLocale: _lan,
   // silentTranslationWarn: false,
    silentFallbackWarn: true,
    messages:null
});

let loadedLanguages = _lan;

function setI18nLanguage (lang) {
    i18n.locale = lang
    axios.defaults.headers.common['Accept-Language'] = lang
    document.querySelector('html').setAttribute('lang', lang)
    return lang
}
  
export function loadLanguageAsync(lang, isFirst = false) {
    // If the same language
    // if (i18n.locale == lang && !isFirst) {
    //   return Promise.resolve(setI18nLanguage(lang));
    // }
  
    // If the language was already loaded
    // if (loadedLanguages == lang && !isFirst) {
    //   return Promise.resolve(setI18nLanguage(lang))
    // }

    // If the language hasn't been loaded yet
    //setI18nLanguage(lang);
    if(lang != undefined) {
        loadLocalLang(lang);
    }
}

function loadLocalLang(lang) {
    return LAN().then((res) => {
        i18n.setLocaleMessage(lang, res);
        loadedLanguages = lang;
        return Promise.resolve(setI18nLanguage(lang));
    }); 
}