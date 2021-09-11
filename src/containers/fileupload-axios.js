import Vue from 'vue'
import axios from 'axios';
import { Message_API_URL } from '@/shared/common/config'
import Router from 'vue-router'
import Swal from 'sweetalert2';
import StorageService from "@/shared/common/storage.service";

Vue.use(Router)

const serviceAxios = axios.create({
    baseURL: 'http://192.168.2.110:810/api/file/upload',
    timeout: 800000,
    // headers: {
    //     'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjA2MTQ4ZGI2YTRiOTAwNTM1OTE1ZWE0ZjdhMzgzNmFiMDEzM2VlMmZjODRkMmRmNmFiZTA4NTY2MWMyYzE4YTZkMmI1N2QwODNjNTVkOTdiIn0.eyJhdWQiOiIzIiwianRpIjoiMDYxNDhkYjZhNGI5MDA1MzU5MTVlYTRmN2EzODM2YWIwMTMzZWUyZmM4NGQyZGY2YWJlMDg1NjYxYzJjMThhNmQyYjU3ZDA4M2M1NWQ5N2IiLCJpYXQiOjE1NjM3NzM0NDYsIm5iZiI6MTU2Mzc3MzQ0NiwiZXhwIjoxNTk1Mzk1ODQ2LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.enHoENtWTXf31CD-kbXHU-V6-eI9e1PBhpUR2Zn2DpfB5b5gUis8GxT0aet8DI_7NyBpEPBQKr5KUysedhaJ1iKA9Ax1rLDsDZnsqwIHRUD76ULUiyiJqB20Kh8bPxEB3u9n66w6JqUS9eAU7YqgaS7ulT4aqy_5kU_6_FIKqQTy42zai4bhyZgJLEBBHk1EoXY9qKCJk98cCnWEd4Ypaf_QShvmluMBfgHkOG6_wQ3EL6iMmflqDsFe4Ti9jDGeJx4VZbexA3piNnjLOPREN1gp6vcg0KmLjwq9ozJDaYFxB1jYiOerpL8owAod6nbHW5FddLzkE9_4Gvff5YhvHxhTYvpv9rcINnvgPWmhdZjEVyZ9YiwodeiXjysqE0VH72MRxktX3mwLF4rkR_Jn6doqddoiScA9hfw6I0Zam-I-4QrISKZ8TkELhBLk8gZjXu_AaMimZNJ4EqSqXt2WEyzq741JYaX3oA-OXnsNtd2GdmRd5YjOEywgDYjstgHhGhltPzDGH8rUR18GGqJT_WAyMx2QQPK-OnODREVKC4bM-kS8attzCaHe5xjBWSRSd7SrwU03Z5iutCNCS0TJQnLv7KFnYQ0WKAU5Omrra7E4RzzXhVDLKRriMniXZstaZhWpSuXIQhexBVg9PpDVLvbM1G5YkqlcAQPXDahRlxI',
    //     'Content-Type': 'application/json'
    // },
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiVXNlcklkIjoibWZpbnRlc3QiLCJTdWJzY3JpcHRpb25JZCI6ImFhOGU3MmU5LWZkN2QtNDI0Ni1iZGJjLTA2N2ZhMDRhNDlkMiIsImV4cCI6MTU2NDEzNjc0MiwiaXNzIjoiU2FqamFkIiwiYXVkIjoiUmVhZGVycyJ9.PLuVG5y-qfL7MK4HhdItq4XLrnlJp_iEWr-BEA00PX4',
        'Content-Type': 'application/octet-stream'
    },
    transformRequest: [function (data, headers) {
        //console.log(headers)
        return data;
    }]

});

Vue.prototype.$http_message_service = serviceAxios;
export const $http_message_service = serviceAxios;

export default {
    $http_message_service
}
