import Vue from 'vue'
import filter from 'lodash/filter'
import forEach from 'lodash/forEach'
export default {
  namespaced: true,
  state: {
    isLoading: false,
    list: {}
  },
  mutations: {
    'ADD' (state, gradient) {
      Vue.set(state.list, gradient.id, gradient)
    },
    'UPDATE' (state, gradient) {
      Vue.set(state.list, gradient.id, gradient)
    },
    'SET' (state, gradientList) {
      forEach(gradientList, (gradient, id) => {
        gradientList[id].id = id
      })
      Vue.set(state, 'list', gradientList)
    },
    'REMOVE' (state, id) {
      Vue.delete(state.list, id)
    },
    'SET_LOADING' (state, isLoading) {
      state.isLoading = isLoading === true
    }
  },
  actions: {},
  getters: {
    list (state, getters, rootState, rootGetters) {
      console.log('recalculate')
      if (rootGetters['filter/type'] !== '') {
        return filter(state.list, gradient => {
          return gradient.data.type === rootGetters['filter/type'] && gradient.tags.indexOf(rootGetters['filter/tags']) > -1
        })
      } else {
        return Object.values(state.list)
      }
    },
    populated (state, getters) {
      return filter(getters.list, gradient => gradient.hasOwnProperty('featured'))
    },
    isLoading (state) {
      return state.isLoading
    }
  }
}
