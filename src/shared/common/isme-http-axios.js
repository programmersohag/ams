import Vue from 'vue'
import axios from 'axios';
import { API_URL } from '@/shared/common/config'
import Router from 'vue-router'
import Swal from 'sweetalert2';
import StorageService from "@/shared/common/storage.service";

Vue.use(Router)

const ismeAxios = axios.create({
    baseURL: API_URL,
    timeout: 55000,
    headers: {
        Authorization: 'Bearer '+StorageService.getToken(),
        'Isme-Token' : StorageService.getIsmeToken(),
        'Content-Type': 'application/json'
    },
    transformRequest: [function (data, headers) {
        return data;
    }]
});
ismeAxios.interceptors.response.use(undefined, err => {
    //const originalRequest = err.config;
   // console.log("originalRequest", originalRequest)
    let message = {
        type: 'error',
        title: 'opps...',
        html: 'Network Error.'
    }
    if(typeof err !== 'undefined'){
        if(err.hasOwnProperty('message')){
            message.html = err.message
        }
     }
     if(typeof err.response !== 'undefined'){
         message.html = err.response.statusText;
         message.title = err.response.status;
         if(err.hasOwnProperty('response') && err.response.hasOwnProperty('data')){
            if(err.response.data.hasOwnProperty('message') && err.response.data.message.length > 0){
               message.html = err.response.data.message
            }
         }
     }
      if(message.html.length > 0){
        Swal(message)
     }
  })

Vue.prototype.$isme_axios = ismeAxios;
export const $isme_axios = ismeAxios;

export default { 
    $isme_axios
}
