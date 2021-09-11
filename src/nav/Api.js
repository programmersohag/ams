import StorageService from "@/shared/common/storage.service";
import { $http_service } from '@/shared/common/service-axios';
import store from '@/store';

export async function getPolicy() {
    let user = store.getters['auth/userInfo'];
    let token = await StorageService.getToken();
    let _url = '/ams-auth-api/authorizations/policies?role_id='+user['role_id'];
    if (token.length == 0) {
        return '0';
    }
    $http_service.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    $http_service.defaults.headers.post['Content-Type'] = 'application/json';
    const response = await $http_service.get(_url)
    .then(response => {
        return response;
    });
return response.data;
}
