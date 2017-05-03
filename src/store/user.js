import Vue from 'vue'
import {auth} from '../services/fire'
import firebase from 'firebase'
export default {
  namespaced: true,
  state: {
    userInfo: null // https://firebase.google.com/docs/auth/web/start
  },
  mutations: {
    set_user_info (state, userInfo) {
      Vue.set(state, 'userInfo', userInfo)
    }
  },
  actions: {
    logout ({store, commit}) {
      return new Promise((resolve, reject) => {
        firebase.auth().signOut().then(() => {
          commit('set_user_info', null)
          resolve(true)
        }).catch(error => {
          reject(error)
        })
      })
    },
    login ({store, commit}, providerName) {
      return new Promise((resolve, reject) => {
        let provider = null
        switch (providerName) {
          case 'google':
            provider = new firebase.auth.GoogleAuthProvider()
            provider.addScope('https://www.googleapis.com/auth/plus.login')
            break
        }
        if (provider !== null) {
          auth.signInWithPopup(provider)
              .then(result => {
                commit('set_user_info', result)
                resolve(result)
              })
              .catch(error => {
                reject(error)
              })
        } else {
          reject('Invalid providerName')
        }
      })
    }
  },
  getters: {
    userInfo (state) {
      return state.userInfo
    }
  }
}
