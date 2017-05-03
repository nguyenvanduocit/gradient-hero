import firebase from 'firebase'
import config from './config'
import store from './../store'
import {CONNECTION_STATUS} from './../store/constant'
export let firebaseApp = firebase.initializeApp(config.firebase)
export let db = firebaseApp.database()
export let auth = firebaseApp.auth()

export const syncConnectionStatus = () => {
  var connectedRef = db.ref('.info/connected')
  connectedRef.on('value', function (snap) {
    if (snap.val() === true) {
      store.commit('set_connect_status', CONNECTION_STATUS.CONNECTED)
    } else {
      store.commit('set_connect_status', CONNECTION_STATUS.DISCONNECTED)
    }
  })
}

export const syncAuth = () => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      store.commit('user/set_user_info', user)
    } else {
      store.commit('user/set_user_info', null)
    }
  })
}

export const syncGradients = () => {
  let gradientsRef = db.ref('gradients')
  store.commit('gradient/SET_LOADING', true)
  gradientsRef.once('value').then((gradientList) => {
    let listValue = gradientList.val()
    store.commit('gradient/SET', listValue)
    store.commit('gradient/SET_LOADING', false)
    let totalSkip = Object.keys(listValue).length // use to advoid child_added run
    gradientsRef.on('child_added', (gradient) => {
      if (totalSkip === 0) {
        store.commit('gradient/ADD', {id: gradient.key, ...gradient.val()})
      } else {
        totalSkip--
      }
    })
    gradientsRef.on('child_changed', (gradient) => {
      store.commit('gradient/UPDATE', {id: gradient.key, ...gradient.val()})
    })
    gradientsRef.on('child_removed', (gradient) => {
      store.commit('gradient/REMOVE', gradient.key)
    })
  })
}

export const syncFirebaseToStore = () => {
  syncConnectionStatus()
  syncAuth()
  syncGradients()
}
