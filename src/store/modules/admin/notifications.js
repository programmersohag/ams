import StorageService from "@/shared/common/storage.service";
import { $axios } from '@/shared/common/http-axios';
import { 
    NOTIFICATION_REQUEST,
    NOTIFICATION_SUCCESS, 
    NOTIFICATION_UNSUCCESS,
    NOTIFICATION_ERROR } from '@/store/actions/admin/notifications';

//initial state
const state = {
    status: '',
    notificationInfo: StorageService.getNotification() || {}
}

// getters
const getters = {
    getNotificationInfo: state => state.notificationInfo,
}

//actions
const actions = {
    getNotifications(context) {
        return new Promise((resolve, reject) => {
            /*StorageService.destroyNotification()
            context.commit(NOTIFICATION_REQUEST);
            let user = StorageService.getUserInfo();
            let _url = '/notifications/ajax_get_notificaiton_by_branch/'+user['branch_id'];
            $axios.get(_url)
            .then(res => {
                if(res.status == 200) {
                    let res_data = res.data.notifications;
                    StorageService.saveNotification(res_data)
                    context.commit(NOTIFICATION_SUCCESS, res_data);
                } else {
                    context.commit(NOTIFICATION_UNSUCCESS);
                }
                resolve(res)
            }).catch((err) => {
                StorageService.destroyNotification()
                context.commit(NOTIFICATION_ERROR);
                reject(err);
            })*/
        }) 
    }
}

//mutations
const mutations = {
    [NOTIFICATION_REQUEST]:(state) => {
        state.status = 'loading';
    },
    [NOTIFICATION_SUCCESS]: (state, notify) => {
        state.status = 'success';
		state.notificationInfo = notify;
    },
    [NOTIFICATION_UNSUCCESS]: (state) => {
        state.status = 'unsucess';
    },
    [NOTIFICATION_ERROR]: (state) => {
        state.status = 'error';
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }
