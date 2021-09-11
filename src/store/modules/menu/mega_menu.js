
//initial state
const state = {
    is_mega_menu: false,
    is_first_setp_menu: true,
    is_second_step_menu: false,
    is_third_step_menu: false,
}

// getters
const getters = {
    getShowMegaMenu(state) {
        return state.is_mega_menu
    },
    getFirstStepMenu(state) {
        return state.is_first_setp_menu
    },
    getSecondStepMenu(state) {
        return state.is_second_step_menu
    },
    getThirdStepMenu(state) {
        return state.is_third_step_menu
    }
}

// actions
const actions = {
    showHide (context) {
        context.commit('showHide')
    },
    firstMenu (context) {
        context.commit('firstMenu')
    },
    secondMenu (context) {
        context.commit('secondMenu')
    }
}
//mutations
const mutations = {
    showHide(state, payload) {
        state.is_mega_menu = !state.is_mega_menu;
        state.is_first_setp_menu = true;
        state.is_second_step_menu = false;
        state.is_third_step_menu = false;
    },
    firstMenu(state) {
        //state.is_mega_menu = false;
        state.is_first_setp_menu = false;
        state.is_second_step_menu = true;
    },
    secondMenu(state) {
        state.is_second_step_menu = false;
        state.is_third_step_menu = true;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }
