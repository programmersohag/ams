import {CONFIG_ERROR, CONFIG_REQUEST, CONFIG_SUCCESS, CONFIG_UNSUCCESS} from '@/store/actions/config/general';
import {$axios} from '@/shared/common/http-axios';
import StorageService from "@/shared/common/storage.service";
//initial state

const state = {
  status: '',
  general_config: StorageService.getGeneralConfig() || {},
}

// getters
const getters = {
  status: state => state.status,
  generalConfigInfo: state => state.general_config,
}

//actions
const actions = {
  getGeneralConfig(context) {
    return new Promise((resolve, reject) => {
        context.commit('configRequest');
        $axios.get("/config-generals")
          .then((resp) => {
            if (resp.data.statusCode === 200) {
              const purpose = resp.data.data['purposes'];
              const organizationConfig = {};
              const averagePositionConfig = {};
              for (const [key, value] of Object.entries(purpose)) {
                const entities = value['purpose_info']['entity'];
                for (let j = 0; j < entities.length; j++) {
                  if (entities[j]['purpose'] === 'average_position') {
                    const filedName = entities[j]['fieldName'];
                    averagePositionConfig[filedName] = entities[j]['defaultValue'];
                  }
                  if (entities[j]['purpose'] === 'general') {
                    const filedName = entities[j]['dbFieldName'];
                    organizationConfig[filedName] = entities[j]['defaultValue'];
                  }
                }
              }
              StorageService.saveGeneralConfig(organizationConfig);
              StorageService.saveAveragePositionConfig(averagePositionConfig);
              context.commit('configSuccess', organizationConfig, purpose);
            } else {
              context.commit('configUnsuccess');
            }
            resolve(resp.data.data);
          }).catch((err) => {
          context.commit('configError');
          reject(err);
        });
      }
    )
      ;
  }
}

//mutations
const mutations = {
  [CONFIG_REQUEST]: (state) => {
    state.status = 'loading';
  },
  [CONFIG_SUCCESS]: (state, records) => {
    state.status = 'success';
    state.general_config = records;
    // Vue.set(state.general_config, records)
  },
  [CONFIG_UNSUCCESS]: (state) => {
    state.status = 'unsucess';
  },
  [CONFIG_ERROR]: (state) => {
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
