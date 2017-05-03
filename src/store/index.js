import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import filter from './filter'
import user from './user'
import gradient from './gradient'
import {CONNECTION_STATUS} from './constant'
const store = new Vuex.Store({
  modules: {
    gradient: gradient,
    filter: filter,
    user: user
  },
  state: {
    connectionStatus: CONNECTION_STATUS.NOT_INITED
  },
  mutations: {
    set_connect_status (state, status) {
      state.connectionStatus = status
    }
  }
})

export default store
