import Vue from 'vue'
import Router from 'vue-router'
import Swal from 'sweetalert2';
import store from "@/store";
import router from "@/router";
import { DATA_ANALISIS_URL } from '@/shared/common/config';
import StorageService from "@/shared/common/storage.service";

Vue.use(Router);

export const axiosRequest = (axios, $this) => {
    return axios.interceptors.request.use(config => {
        if(config['baseURL'] == DATA_ANALISIS_URL){
           let token = StorageService.getDalToken();
           config.headers.Authorization = `Bearer ${token}`;
        }
        isLoading($this, true);
        return config;
    }, err => {
        isLoading($this, false);
        return Promise.reject(err);
    })
}

export const axiosResponse = (axios, $this) => {
    return axios.interceptors.response.use(res => {
        let config = res['config'];
        if(res.headers['server-name']) {
            let _loadBalancing = StorageService.getLoadBalancing();
            if(!_loadBalancing) {
                _loadBalancing = [];
            }
            _loadBalancing.push(res.headers['server-name']);
            const uniqueLB = [...new Set(_loadBalancing.map(item => item))];
            StorageService.saveLoadBalancing(uniqueLB)
           $this.$root.serverName = StorageService.getLoadBalancing();
        }
        let isDal = false;
        if(config && (config['baseURL'] == DATA_ANALISIS_URL)){
            isDal = true;
        }
        isLoading($this, false);
        if(res.data.status == "403" && !isDal) {
            router.push({
                path: '/error/403'      
            });
        }
        return res;
    }, err => {
        isLoading($this, false);
        //console.log("err", err.config);
       //console.log("response", err.response)
        let config = (err.response['config'] != undefined) ? err.response['config']: "";
        let isDal = false;
        if(config && (config['baseURL'] == DATA_ANALISIS_URL)){
            isDal = true;
        }
        /*if(err.response.status == '401' && !isDal){
            store.dispatch('auth/unauthorizeLogout');
            router.push( { name: 'Login' } )
         // router.go();
            return err;
        }*/
    
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
         if(typeof err.response !== 'undefined' && router.currentRoute.name !== "Login"){
             message.html = err.response.statusText;
             message.title = err.response.status;
             if(err.hasOwnProperty('response') && err.response.hasOwnProperty('data')){
                if(err.response.data.hasOwnProperty('message') && err.response.data.message.length > 0){
                   message.html = err.response.data.message
                }
             }
         }
          if(message.html.length > 0){
            if(err.response.status != '401')
                Swal(message)
         }
         return Promise.reject(err);
      })
}

function isLoading($this, boolean) {
    if($this != undefined) {
        $this.$root.isLoading = boolean;
    }
}
