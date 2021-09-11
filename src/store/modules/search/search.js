import {
    SEARCHING_REQUEST,
    SEARCHING_SUCCESS,
    SEARCHING_FAILURE,
    SEARCHING_PARAMETER,
    SEARCHING_ERROR } from '@/store/actions/search';
import { $axios } from '@/shared/common/http-axios';

const getDefaultState = () => {
    return {
        status: '',
        parameter:{}
    }
}

// initial state
const state = getDefaultState();
// getters
const getters = {
    status: state => state.status,
    /*searchingRecord: (state) => {
        return state.status  ;},*/
    getSearching: state => state.parameter,


};

//actions
const actions = {
    searchingRecord(context, records) {
        if(records){
            return new Promise((resolve, reject) => {
                context.commit('searchingParameter', records);
                resolve(records);
            })
        }else{
            context.commit('searchingFailure');
        }

    },

    resetState ({ commit }) {
        commit('resetState')
    }
};

//mutations
const mutations = {
    [SEARCHING_REQUEST]:(state) => {
        state.status = 'loading';
    },
    [SEARCHING_PARAMETER]: (state, records) => {
        state.status = 'success';
        state.parameter = records;
    },
    /*[SEARCHING_SUCCESS]: (state) => {
        state.status = 'success';
    },*/
    [SEARCHING_FAILURE]: (state) => {
        state.status = 'failure';
    },
    [SEARCHING_ERROR]: (state) => {
        state.status = 'error';
    },
    resetState (state) {
        Object.assign(state, getDefaultState())
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}