import {API_URL} from '@/shared/common/config';
import StorageService from "@/shared/common/storage.service";
//import io from 'socket.io-client';
import router from '@/router/index.js';
import cookieService from "@/shared/common/cookie.service";
//import * as JsEncryptModule from 'jsencrypt';
import JsEncrypt from 'jsencrypt/bin/jsencrypt';

import {
  AUTH_ERROR,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_UPDATE,
  IS_LOADING_SHOW,
  LOGOUT,
  SOFTWARE_DATE,
  THEME,
  THEME_COLOR
} from '@/store/actions/auth';
import qs from 'qs';

const axios = require('axios')
var publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCz1zqQHtHvKczHh58ePiRNgOyiHEx6lZDPlvwBTaHmkNlQyyJ06SIlMU1pmGKxILjT7n06nxG7LlFVUN5MkW/jwF39/+drkHM5B0kh+hPQygFjRq81yxvLwolt+Vq7h+CTU0Z1wkFABcTeQQldZkJlTpyx0c3+jq0o47wIFjq5fwIDAQAB';
// var socket = io.connect(SOCKET_URL, {
//     query: {
//         token: StorageService.getToken()
//         }
//     });
// import { socket } from '@/shared/common/socket-service';

//initial state

const state = {
    status: '',
	token: StorageService.getToken() || '',
    user: StorageService.getUserInfo() || {},
    error:'',
    isLoadingShow:true
}

// getters
const getters = {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    userInfo: state => state.user,
    tokenInfo: state => state.token,
    errorMessage: state=> state.error,
    isLoadingShow: state => state.isLoadingShow,
}

//actions
const actions = {
    login(context, loginInfo) {
        return new Promise((resolve, reject) => {
            let _RsaEncrypt = new JsEncrypt();
            _RsaEncrypt.setPublicKey(publicKey);
            let encryptedPassword = _RsaEncrypt.encrypt(loginInfo.password);
            let sessionId = cookieService.getSessionId();
            if(!sessionId) {
                sessionId = cookieService.saveSessionId();
            }
            context.commit('authRequest')
            const requestBody = qs.stringify({
                grant_type: 'password',
                username: loginInfo.userName,
                password: encryptedPassword,
                domain: loginInfo.mfi_name,
                session_id: sessionId
            });
            const config = {
                headers: {
                    Authorization: 'Basic dHJ1c3RlZC1hcHA6cGFzc3dvcmQ=',
                    'Content-Type': 'application/x-www-form-urlencoded'
                   // ,'Device-Key':'b6k8g2y5'
                }
            }

          window.localStorage.clear();

            axios.post(API_URL+'ams-auth-api/oauth/token', requestBody, config)
                .then(response => {
                    return response;
                })
                .then((resData) => {
                    if(resData.status == 200) {
                        let res = resData.data;
                        let token = res.access_token;
                        let refreshToken = res.refresh_token;
                        let token_expires_time = res.expires_in;
                        // let token_expires_time = 120;
                        delete axios.defaults.headers.common["Authorization"];
                        axios.defaults.headers.common['Content-Type'] = 'application/json';
                        axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
                        let default_branch_id = res.user.default_branch_id;
                        let params = {}
                        params['branch_id'] = default_branch_id;
                      let ciRes = JSON.parse('{"status":"200","data":{"branch":{"name":"Head Office","branch_type":null,"software_start_date":"2014-11-30","work_start_time":"0","work_end_time":"0","is_head_office":"1","is_fingerprint_enabled":"0","branch_closing_date":null,"address":"House # 27, Baitul Zannat Zame Moszid Road (In Front Of Police Line), West Mojompur, Kushtia.","lat":"23.8976","lng":"89.1182","software_date":"2021-02-15","software_date_ais":"2020-12-01","id":1,"login":"admin","logged_in":true,"role_id":1,"branch_id":1,"branch_type_id":0,"is_super_admin":1,"default_language":"english"}}}');
                      // console.log(ciRes);return;
                      if(ciRes.status == 200) {
                        var user = {};
                        // console.log(res);return;
                        user.id = res.user.oldUserId
                        user.login = res.user.login
                        user.logged_in = true
                        user.role_id = res.user.role_id
                        user.name = res.user.full_name
                        user.is_super_admin = res.user.is_super_admin
                        user.email = res.user.email
                        //user.default_language = res.user.default_language
                        user.branch_id = default_branch_id
                        user.mfi_name = res.user.mfi_name
                        user.theme_color = res.user.theme_color
                        user.theme = res.user.theme
                        user.module = 'MIS';
                        user.lat = '';
                        user.lng = '';
                        user.branch_name = ciRes.data.branch.name
                        user.is_head_office = ciRes.data.branch.is_head_office
                        user.branch_type = ciRes.data.branch.branch_type
                        user.software_date = ciRes.data.branch.software_date;
                        user.userType = res.user.userType;
                        let default_language = ciRes.data.branch.default_language;
                        let lan = "en";
                        if(default_language != 'english') {
                          lan = "bn";
                        }
                        user.default_language = default_language
                        user.lan = lan;
                        user.address = ciRes.data.branch.address
                        user.software_date_ais = ciRes.data.branch.software_date_ais;
                        user.software_start_date = ciRes.data.branch.software_start_date;
                        StorageService.saveToken(token);
                        StorageService.saveUserInfo(user);
                        StorageService.saveTokenExpiresTime(token_expires_time);
                        StorageService.saveRefreshToken(refreshToken);
                        // socket.emit("joinBranch",default_branch_id);
                        context.commit('authSuccess', token, user);
                        resolve(ciRes);
                      } else {
                        delete axios.defaults.headers.common["Authorization"];
                        axios.defaults.headers.common['Authorization'] = 'Bearer ';
                        context.commit('authError',ciRes.data.message);
                        reject("");
                      }
                    } else {
                        delete axios.defaults.headers.common["Authorization"];
                        axios.defaults.headers.common['Authorization'] = 'Bearer ';
                        context.commit('authError',resData.data.message);
                        reject("");
                    }
                })
                .catch (error => {
                    context.commit('authError',error.response.data.error_description)
                    reject(error);
                })
        })
    },
    logout(context) {
      window.localStorage.clear();
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = 'Bearer '+StorageService.getToken();
         //   axios.delete(API_URL + 'auth-api/oauth/revoke-token')
         //   .then(resp => {
                context.commit('logout');
                // let branchId =  StorageService.getUserInfo();
                // socket.emit("leaveBranch",branchId['branch_id']);
                StorageService.destroyToken();
                StorageService.destroyRefreshToken();
                StorageService.destroyTokenExpiresTime();
                StorageService.destroyUserInfo();
                StorageService.destroyGeneralConfig();
                StorageService.destroyPolicy();
                StorageService.destroyNotification();
                StorageService.destroySavingInterestCal();
                delete axios.defaults.headers.common["Authorization"];
                axios.defaults.headers.common['Authorization'] = 'Bearer';
                resolve('');
            // })
            // .catch((err) => {
            //      context.commit('authError');
            //      this.destoryLocalStrogae();
            //      reject(err);
            //  })
        })
    },
    unauthorizeLogout(context) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = 'Bearer '+StorageService.getToken();
          //  axios.delete(API_URL + 'auth-api/oauth/revoke-token')
         //   .then(resp => {
                context.commit('logout');
                // let branchId =  StorageService.getUserInfo();
                // socket.emit("leaveBranch",branchId['branch_id']);
                StorageService.destroyToken();
                StorageService.destroyRefreshToken();
                StorageService.destroyTokenExpiresTime();
                StorageService.destroyUserInfo();
                StorageService.destroyGeneralConfig();
                StorageService.destroyPolicy();
                StorageService.destroyNotification();
                StorageService.destroySavingInterestCal();
                delete axios.defaults.headers.common["Authorization"];
                axios.defaults.headers.common['Authorization'] = 'Bearer';
                resolve('');
            // })
            // .catch((err) => {
            //      context.commit('authError');
            //      reject(err);
            //  })
        })
    },
    destoryLocalStrogae(){
        StorageService.destroyToken();
        StorageService.destroyRefreshToken();
        StorageService.destroyTokenExpiresTime();
        StorageService.destroyUserInfo();
        StorageService.destroyGeneralConfig();
        StorageService.destroyPolicy();
        StorageService.destroyNotification();
        StorageService.destroySavingInterestCal();
        delete axios.defaults.headers.common["Authorization"];
        axios.defaults.headers.common['Authorization'] = 'Bearer';
        router.push( { name: 'Login' } )
    },

    updateUserInfo(context, userInfo){
        context.commit("authUpdate", userInfo);
    },
    updateSoftwareDate(context, software_date){
        context.commit("softwareDate", software_date);
       // StorageService.saveUserInfo(context.state['user']);
    },
    updateThemeColor(context, color){
        context.commit("themeColor", color);
       // StorageService.saveUserInfo(context.state['user']);
    },
    updateTheme(context, color){
        context.commit("theme", color);
       // StorageService.saveUserInfo(context.state['user']);
    },
    setLoadingShow(context, isModal = true) {
        if(isModal != state.isLoadingShow) {
            context.commit("is_loading_show", isModal);
        }
    }
}

//mutations
const mutations = {
    [AUTH_REQUEST]:(state) => {
        state.status = 'loading'
    },
    [AUTH_SUCCESS]: (state, token) => {
        state.status = 'success'
		state.token = token
        state.user = StorageService.getUserInfo()
    },
    [AUTH_ERROR]: (state, error) => {
        state.status = 'error'
        state.error = error
    },
    [AUTH_UPDATE]: (state, userInfo) => {
        let user_info = state.user;
        Object.assign(user_info, userInfo);
        StorageService.saveUserInfo(user_info);
        state.user = StorageService.getUserInfo();
    },
    [SOFTWARE_DATE]: (state, software_date) => {
        let user_info = state.user;
        if(user_info['module'] == 'MIS') {
            user_info.software_date = software_date;
        } else {
            user_info.software_date_ais = software_date;
        }
        StorageService.saveUserInfo(user_info);
        state.user = StorageService.getUserInfo()
    },
    [THEME_COLOR]: (state, color) => {
        let user_info = state.user;
        user_info.theme_color = color;
        StorageService.saveUserInfo(user_info);
        state.user = StorageService.getUserInfo()
    },
    [THEME]: (state, theme) => {
        let user_info = state.user;
        user_info.theme = theme;
        StorageService.saveUserInfo(user_info);
        state.user = StorageService.getUserInfo()
    },
    [LOGOUT]: (state) => {
        state.status = ''
        state.token = ''
        state.user = {}
      },
    [IS_LOADING_SHOW]: (state, isModal) => {
        state.isLoadingShow = isModal;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }
