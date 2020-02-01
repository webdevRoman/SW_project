import Vue from 'vue'
import axios from 'axios'

export default {
  state: {
    token: localStorage.getItem('user-token') || '',
    name: '',
    surname: '',
    middlename: '',
  },
  mutations: {
    LOAD_USERNAME(state) {
      const username = Vue.$cookies.get('username')
      state.name = username.name
      state.surname = username.surname
    },
    SET_USER(state, user) {
      state.name = user.firstname
      state.surname = user.lastname
      Vue.$cookies.set('username', { name: user.firstname, surname: user.lastname })
    },
    AUTH_LOGOUT(state) {
      state.status = ''
      state.token = ''
      state.name = ''
      state.surname = ''
      Vue.$cookies.remove('username')
    }
  },
  actions: {
    LOAD_USERNAME({commit}) {
      commit('LOAD_USERNAME')
    },
    AUTH_REQUEST({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        const url = '/modules/auth/login'
        axios({ url: url, data: user, method: 'POST' })
        .then(resp => {
          commit('SET_USER', resp.data)
          commit('SET_PROCESSING', false)
          resolve(resp)
        })
        .catch(err => {
          commit('SET_PROCESSING', false)
          reject(err)
        })
      })
    },
    AUTH_LOGOUT({commit}) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        const url = '/modules/auth/logout'
        axios({ url: url, method: 'POST' })
        .then(resp => {
          commit('AUTH_LOGOUT')
          commit('SET_PROCESSING', false)
          resolve()
        })
        .catch(err => {
          commit('SET_PROCESSING', false)
          reject(err)
        })
      })
    },
    LOAD_ACCOUNT({commit}) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        const url = '/modules/account'
        axios({ url: url, method: 'GET' })
        .then(resp => {
          console.log(resp.data)
          commit('SET_PROCESSING', false)
          resolve()
        })
        .catch(err => {
          commit('SET_PROCESSING', false)
          reject(err)
        })
      })
    },
    REG_REQUEST({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        const url = '/modules/auth/signup'
        axios({ url: url, data: user, method: 'POST' })
        .then(() => {
          Vue.$cookies.set('email', user.email)
          commit('SET_PROCESSING', false)
          resolve()
        })
        .catch(err => {
          commit('SET_PROCESSING', false)
          reject(err)
        })
      })
    },
    SEND_LINK({commit}) {
      return new Promise((resolve, reject) => {
        if (Vue.$cookies.get('email') != null) {
          commit('SET_PROCESSING', true)
          const url = '/modules/auth/resend'
          axios({ url: url, data: Vue.$cookies.get('email'), method: 'POST' })
          .then(() => {
            commit('SET_PROCESSING', false)
            resolve()
          })
          .catch(err => {
            commit('SET_PROCESSING', false)
            reject(err)
          })
        }
      })
    },
  },
  getters: {
    name: state => state.name,
    surname: state => state.surname,
    middlename: state => state.middlename,
    isAuthenticated: state => !!state.token
  }
}