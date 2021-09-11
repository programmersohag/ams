import StorageService from "@/shared/common/storage.service";
import {AUTH_ERROR, AUTH_REQUEST, AUTH_SUCCESS} from '@/store/actions/data-analisis';

//initial state

const state = {
    status: '',
  	token: StorageService.getDalToken() || '',
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
                Email: 'host1@microfin360.com',
                Password: 'host123'
            }
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
