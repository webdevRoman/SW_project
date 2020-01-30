// import Vue from 'vue'
import axios from 'axios'

export default {
  state: {
    token: localStorage.getItem('user-token') || '',
    name: '',
    surname: '',
    middlename: '',
  },
  mutations: {
    AUTH_REQUEST(state) {
      state.status = 'loading'
    },
    AUTH_SUCCESS(state, token) {
      state.status = 'success'
      state.token = token
    },
    AUTH_ERROR(state) {
      state.status = 'error'
    },
    AUTH_LOGOUT(state) {
      state.status = ''
      state.token = ''
      state.name = ''
      state.surname = ''
      state.middlename = ''
    }
  },
  actions: {
    // LOAD_DATA({commit}, url) {
    //   return new Promise((resolve) => {
    //     axios.post(url, {id: 235}, {
    //       headers:  { 
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //       }
    //     })
    //     .then(
    //       result => {
    //         commit('LOAD_DATA', result)
    //         resolve(result)
    //       }
    //     )
    //   })
    // },
    AUTH_REQUEST({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST')
        commit('SET_PROCESSING', true)
        const proxyurl = 'https://cors-anywhere.herokuapp.com/'
        const url = 'https://pylearn.info/modules/auth/login'
        axios({ url: proxyurl + url, data: user, method: 'POST' })
        .then(resp => {
          // const token = resp.data.token
          // localStorage.setItem('user-token', token)
          // commit('AUTH_SUCCESS', token)
          // dispatch('USER_REQUEST')                   // set user name, surname...
          commit('SET_PROCESSING', false)
          resolve(resp)
        })
        .catch(err => {
          commit('AUTH_ERROR', err)
          // localStorage.removeItem('user-token')
          commit('SET_PROCESSING', false)
          reject(err)
        })
      })
    },
    AUTH_LOGOUT({commit}) {
      return new Promise((resolve) => {
        commit('AUTH_LOGOUT')
        // localStorage.removeItem('user-token')
        resolve()
      })
    }
  },
  getters: {
    name: state => state.name,
    surname: state => state.surname,
    // middlename: state => state.middlename,
    isAuthenticated: state => !!state.token
  }
}