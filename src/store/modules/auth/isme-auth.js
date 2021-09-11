import StorageService from "@/shared/common/storage.service";
import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_ERROR } from '@/store/actions/isme-auth';
import axios from 'axios';
import { API_URL } from '@/shared/common/config';
import { $http_service } from '@/shared/common/service-axios';

//initial state

const state = {
    status: '',
  	token: StorageService.getIsmeToken() || '',
}

// getters
const getters = {
    authStatus: state => state.status,
    tokenInfo: state => state.token,
}

//actions
const actions = {
    login(context) {
        return new Promise((resolve, reject) => {
            context.commit('authRequest')
            let params = {
                email: 'host1@microfin360.com',
                password: 'host1233'
            }
            $http_service.post(API_URL+"isme-service/login/", JSON.stringify(params))
                .then((resp) => {
                    if(resp.status == 200) {
                        const token = resp.data.data.access_token;
                        StorageService.saveIsmeToken(token);
                        context.commit('authSuccess', token);
                        resolve(resp);
                    }
                }).catch((err) => {
                context.commit('authError');
                StorageService.destroyIsmeToken();
                reject(err);
            })
        }) 
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
    },
    [AUTH_ERROR]: (state) => {
        state.status = 'error'
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }