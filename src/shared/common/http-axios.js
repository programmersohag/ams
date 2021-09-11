import Vue from 'vue'
import axios from 'axios';
import { AMS_API_URL } from '@/shared/common/config';

export const ciInstance = axios.create({
    baseURL: AMS_API_URL,
    //timeout: 200000,
    transformRequest: [function (data) {
        return data;
    }],
    validateStatus: function (status) {
        if(status < 300 || status === 400) {
            return status;
        }
    }
});

Vue.prototype.$axios = ciInstance;
export const $axios = ciInstance;

export default {
    $axios
}
