import Vue from 'vue'
import axios from 'axios';
import { FILEUPLOAD_API_URL } from '@/shared/common/config'
import Router from 'vue-router'
import Swal from 'sweetalert2';
import StorageService from "@/shared/common/storage.service";

Vue.use(Router)

const serviceAxios = axios.create({
    baseURL: FILEUPLOAD_API_URL,
    timeout: 800000,
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiVXNlcklkIjoibWZpbnRlc3QiLCJTdWJzY3JpcHRpb25JZCI6ImFhOGU3MmU5LWZkN2QtNDI0Ni1iZGJjLTA2N2ZhMDRhNDlkMiIsImV4cCI6MTU2NDM3MzIwMiwiaXNzIjoiU2FqamFkIiwiYXVkIjoiUmVhZGVycyJ9.rjwvatWZXotF5yJUl7-mPmRtNo5iXJcerCRInjmG-hA',
        'Content-Type': 'application/json'
    },
    transformRequest: [function (data, headers) {
        //console.log(headers)
        return data;
    }]

});

Vue.prototype.$http_fileupload_service = serviceAxios;
export const $http_fileupload_service = serviceAxios;

export default {
    $http_fileupload_service
}
