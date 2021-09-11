// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'

import './assets/js/jquery.min.js'
import './assets/js/jquery-ui.min.js'
import './assets/css/mega-menu.css'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate';
import App from './App'
import router from './router'
import store from './store/index'
import '@/shared/common/http-axios';
import '@/shared/common/service-axios';
import '@/shared/common/message-axios';
import '@/shared/mixin/select-options';

import {mixin} from '@/shared/mixin/index';
import VueMoment from 'vue-moment'
import moment from 'moment';
import CxltToastr from 'cxlt-vue2-toastr';
import vSelect from 'vue-select'
import PrintMenu from '@/containers/PrintMenu';
import ExportData from '@/containers/ExportData';
import { i18n } from '@/shared/lan/i18n-setup';
import constants from "@/shared/common/config.js"
import {numberConverter} from '@/shared/utils';
import theme_colors from "./assets/theme_colors.json"
import '@/shared/filter';
import Button from "@/containers/ui/Button";
import Loader from "@/containers/ui/Loader";
import axios from 'axios';
import StorageService from "@/shared/common/storage.service";
import { loadLanguageAsync } from '@/shared/lan/i18n-setup';
import './service-workers/registerServiceWorker'
import IdleVue from "idle-vue";
const eventsHub = new Vue();
Vue.use(IdleVue, {
    eventEmitter: eventsHub,
    store,
    idleTime: 1000, // 7 seconds,
    startAtIdle: false
});

Vue.component('mf-button', Button);
Vue.component('mf-loader', Loader);
Vue.component('v-select', vSelect);
Vue.component('print-menu', PrintMenu);
Vue.component('mf-export-menu', ExportData);
// Vue.component('mf-card', Card);

var toastrConfigs = {
    position: "top right",
    showDuration: 1000,
    hideDuration: 1000,
    delay: 10,
    timeOut: 2500,
    closeButton: true,
    progressBar: true,
    warningColor: '#f89406',
    infoColor: '#2f96b4',
    successColor: '#51a351',
    errorColor: '#bd362f'
    // showMethod: "swing"
};

Vue.use(CxltToastr, toastrConfigs);

Vue.use(VueMoment, {
    moment,
})

Vue.use(VeeValidate, { fieldsBagName: 'veeFields' });

Vue.use(BootstrapVue, {
    breakpoints: [`xs`, 'sm', 'md', 'mdlg', 'lg', 'xl', 'xxl']
})

Vue.mixin({
    methods: {
        flashMessage: function (status, message, timeOut) {
            if(!timeOut){
                timeOut = 2500;
            }
            status = status.toUpperCase();
            if(status=='SUCCESS')
                this.$toast.success({title:status,message:message});
            else if(status=='WARNING')
                this.$toast.warn({title:status,message:message,timeOut:timeOut});
            else if(status=='FAILURE')
                this.$toast.error({title:status,message:message,timeOut:timeOut});
        }
    },
    computed: {
        currentUrl(){
            var currentLocation = this.$route.path;
            var lastword = currentLocation.split("/").pop();
            if(lastword == 'dashboard'){
                return true;
            }else{
                return '';
            }
        }
    }
});

Vue.prototype.$constants = constants;
Vue.prototype.$theme_colors = theme_colors;
Vue.prototype.$numberConverter = numberConverter;
// if page loading
axios.defaults.headers.common['Accept-Language'] = 'en';
axios.defaults.headers.common['Authorization'] = 'Bearer '+StorageService.getToken();
let user_info = store.getters['auth/userInfo'];
loadLanguageAsync(user_info['lan'], true);
/* eslint-disable no-new */
new Vue({
    i18n,
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    },
    mixins: [mixin]
});

// history.pushState(null, null, location.href);
//     window.onpopstate = function () {
//         history.go(1);
//     };

switch (true) {
    case window.location.hostname.includes('.test'):
        Vue.prototype.$api = process.env.VUE_APP_API_URL_DEV;
        break;

    case (process.env.NODE_ENV === 'development'):
        Vue.prototype.$api = ''; // <-- proxy being used here
        break;

    default:
        Vue.prototype.$api = process.env.VUE_APP_API_URL_PROD;
}