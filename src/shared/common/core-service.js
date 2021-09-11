import Vue from 'vue'
import axios from 'axios';
import {CORE_API_URL} from '@/shared/common/config';
import StorageService from "@/shared/common/storage.service";

export const coreServiceInstances = axios.create({
  baseURL: CORE_API_URL,
  timeout: 800000,
  headers: {
    'Content-Type': 'application/json',
    'site-name': 'shiropa'
    // Authorization: 'Bearer '+StorageService.getDalToken(),
  },
  transformRequest: [function (data) {
    return data;
  }],
  validateStatus: function (status) {
    if (status < 300 || status === 400) {
      return status;
    }
  }

});
coreServiceInstances.defaults.headers['Authorization'] = StorageService.getToken();

Vue.prototype.$http_core_service = coreServiceInstances;
export const $http_core_service = coreServiceInstances;

export default {
  $http_core_service
}
