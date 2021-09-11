import Vue from 'vue'
import axios from 'axios';
import { USER_AUDIT_TRIAL } from '@/shared/common/config';

export const uatServiceInstances = axios.create({
    baseURL: USER_AUDIT_TRIAL,
    timeout: 800000,
    headers: {
        'Content-Type': 'application/json'
    },
    transformRequest: [function (data) {
        return data;
    }],
    validateStatus: function (status) {
        if(status < 300 || status == 400) {
            return status;
        }
    }

});

Vue.prototype.$http_uat_service = uatServiceInstances;
export const $http_uat_service = uatServiceInstances;

export default {
    $http_uat_service
}
