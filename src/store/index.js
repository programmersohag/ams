import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth/auth'

import isme_auth from './modules/auth/isme-auth';
import users from './modules/user/policy';
//import mega_menu from './modules/menu/mega_menu';
import config from './modules/config/general';
import admin from './modules/admin/notifications';
import dataAnalisis from './modules/auth/data-analisis';
import search from './modules/search/search';

Vue.use(Vuex);

//console.log('router')

const debug = process.env.NODE_ENV !== 'production'

//Vue.config.devtools =false
//console.log(Vue.http)

const store = new Vuex.Store({
    modules: {
        auth,
        isme_auth,
        config,
        users,
        admin,
        dataAnalisis,
        search

    },
    strict: debug
});
export default store;