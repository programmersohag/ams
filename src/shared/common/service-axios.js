import Vue from 'vue'
import axios from 'axios';
import { API_URL } from '@/shared/common/config'
import Router from 'vue-router';

Vue.use(Router)

export const serviceInstance = axios.create({
    baseURL: API_URL,
   // timeout: 10000,
    headers: {
        // 'Authorization': 'Bearer '+StorageService.getToken(),
        'Content-Type': 'application/json'
    },
    transformRequest: [function (data) {
        return data;
    }],
    validateStatus: function (status) {
        if(status < 300 || status === 400) {
            return status;
        }
    }

});

Vue.prototype.$http_service = serviceInstance;
export const $http_service = serviceInstance;

export default {
    $http_service
}
