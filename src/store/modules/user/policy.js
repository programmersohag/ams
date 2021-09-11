import StorageService from "@/shared/common/storage.service";
import { $http_service } from '@/shared/common/service-axios';
import { 
    POLICY_REQUEST,
    POLICY_SUCCESS, 
    POLICY_ERROR,
    POLICY_UNSUCCESS } from '@/store/actions/user/policy';

//initial state
const state = {
    status: '',
    policyInfo: StorageService.getPolicy() || {},
}

// getters
const getters = {
    authStatus: state => state.status,
    policyInfo: state => state.policyInfo,
}

//actions
const actions = {
    getPolicy(context) {
        return new Promise((resolve, reject) => {
            context.commit('policyRequest');
            let user = StorageService.getUserInfo();
            let _url = '/ams-auth-api/authorizations/policies?role_id='+user['role_id'];
            $http_service.get(_url)
            .then(res => {
                if(res.status == 200) {
                    let res_data = res.data.policyRuleModels;
                    let policy_data = [];
                    if(res_data.length > 0) {
                        for(let key in res_data) {
                            policy_data[key] = res_data[key]['action'];
                        }
                    }
                    StorageService.savePolicy(policy_data);
                    context.commit('policySuccess', policy_data);
                } else {
                    context.commit('policyUnsuccess');
                }
            }).catch((err) => {
                context.commit('policyError');
                reject(err);
            })
        }) 
    }
}

//mutations
const mutations = {
    [POLICY_REQUEST]:(state) => {
        state.status = 'loading';
    },
    [POLICY_SUCCESS]: (state, policy) => {
        state.status = 'success';
		state.policyInfo = policy;
    },
    [POLICY_UNSUCCESS]: (state) => {
        state.status = 'unsucess';
    },
    [POLICY_ERROR]: (state) => {
        state.status = 'error';
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }
