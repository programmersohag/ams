import { ciInstance } from '@/shared/common/http-axios';
import { serviceInstance } from '@/shared/common/service-axios';
import { mesgServiceInstances } from '@/shared/common/message-axios';
import { uatServiceInstances } from '@/shared/common/user-audit-trial-service';
import { coreServiceInstances } from '@/shared/common/core-service';
import { axiosRequest, axiosResponse } from "@/shared/services/interceptors";

export const mixin = {
    data: function () {
        return {
            isLoading: false,
            axiosInterceptor: null,
            serverName:[]
        }
    },
    methods: {

        /*        ci service       */

        ciServiceEnableInterceptor() {
            if(ciInstance) {
                this.axiosInterceptor = axiosRequest(ciInstance, this);
                axiosResponse(ciInstance, this);
            }
        },
        ciServiceDisableInterceptor() {
            if(ciInstance) {
                ciInstance.interceptors.request.eject(this.axiosInterceptor);
            }
        },

         /*        service       */

        serviceEnableInterceptor() {
            if(serviceInstance) {
                this.axiosInterceptor = axiosRequest(serviceInstance, this);
                axiosResponse(serviceInstance, this);
            }
        },
        serviceDisableInterceptor() {
            if(serviceInstance) {
                serviceInstance.interceptors.request.eject(this.axiosInterceptor);
            }
        },

        /*        message service       */

        mesgServiceEnableInterceptor() {
            if(mesgServiceInstances) {
                this.axiosInterceptor = axiosRequest(mesgServiceInstances, this);
                axiosResponse(mesgServiceInstances, this);
            }
        },
        mesgServiceDisableInterceptor() {
            if(mesgServiceInstances) {
                mesgServiceInstances.interceptors.request.eject(this.axiosInterceptor);
            }
        },


          /*           user audit trials           */
        uatServiceEnableInterceptor() {
            if(uatServiceInstances) {
                this.axiosInterceptor = axiosRequest(uatServiceInstances, this);
                axiosResponse(uatServiceInstances, this);
            }
        },
        uatServiceDisableInterceptor() {
            if(uatServiceInstances) {
                uatServiceInstances.interceptors.request.eject(this.axiosInterceptor);
            }
        },

         /*           data analysis           */
         datServiceEnableInterceptor() {
            if(coreServiceInstances) {
                this.axiosInterceptor = axiosRequest(coreServiceInstances, this);
                axiosResponse(coreServiceInstances, this);
            }
        },
        datServiceDisableInterceptor() {
            if(coreServiceInstances) {
                coreServiceInstances.interceptors.request.eject(this.axiosInterceptor);
            }
        },

        enableInterceptor() {
            this.ciServiceEnableInterceptor();
            this.serviceEnableInterceptor();
            this.mesgServiceEnableInterceptor();
            this.uatServiceEnableInterceptor();
            this.datServiceEnableInterceptor();
        },
        disableInterceptor() {
            this.ciServiceDisableInterceptor();
            this.serviceDisableInterceptor();
            this.mesgServiceDisableInterceptor();
            this.uatServiceDisableInterceptor();
            this.datServiceDisableInterceptor();
        },
        ismeLogin: function() {
            this.$store.dispatch('isme_auth/login');
        },
        dataAnalisisLogin: function() {
            this.$store.dispatch('dataAnalisis/login');
        }
    }
}
