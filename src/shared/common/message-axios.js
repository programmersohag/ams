import Vue from 'vue'
import axios from 'axios';
import { Message_API_URL } from '@/shared/common/config';

export const mesgServiceInstances = axios.create({
    baseURL: Message_API_URL,
    timeout: 800000,
    headers: {
       // 'Authorization': 'Bearer '+token,
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

Vue.prototype.$http_message_service = mesgServiceInstances;
export const $http_message_service = mesgServiceInstances;

export default {
    $http_message_service
}
