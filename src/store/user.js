import Vue from 'vue'
import axios from 'axios'

export default {
  state: {
    isAuthenticated: false,
    isAdmin: true,
    name: '',
    surname: '',
    middlename: '',
    limit: 0,
    order: true,
    start: null,
    end: null
  },
  mutations: {
    SET_AUTHENTICATED(state, data) {
      state.isAuthenticated = data
    },
    LOAD_USERNAME(state) {
      const username = Vue.$cookies.get('username')
      state.name = username.name
      state.surname = username.surname
      state.isAuthenticated = true
    },
    SET_USER(state, user) {
      state.name = user.firstname
      state.surname = user.lastname
      state.isAuthenticated = true
      Vue.$cookies.set('username', { name: user.firstname, surname: user.lastname }, '1m')
    },
    AUTH_LOGOUT(state) {
      state.status = ''
      state.token = ''
      state.name = ''
      state.surname = ''
      state.isAuthenticated = false
      Vue.$cookies.remove('username')
    },
    SET_USER_ACCOUNT(state, data) {
      state.name = data.firstname
      state.surname = data.lastname
      state.middlename = data.midname
      state.order = data.order
      state.start = data.start != null ? data.start.split('/').join('.') : data.start
      state.end = data.end != null ? data.end.split('/').join('.') : data.end
      Vue.$cookies.set('username', { name: data.firstname, surname: data.lastname }, '1m')
    },
    SET_LIMIT(state, limit) {
      Vue.set(state, 'limit', limit)
    }
  },
  actions: {
    CHECK_AUTHORIZED({commit}) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        if (Vue.$cookies.get('username') != null) {
          commit('SET_AUTHENTICATED', true)
          commit('SET_PROCESSING', false)
          resolve()
        } else {
          commit('SET_AUTHENTICATED', false)
          commit('SET_PROCESSING', false)
          reject()
        }
      })
    },
    CHECK_AUTHORIZED_ADMIN({commit, dispatch, getters}) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        dispatch('CHECK_AUTHORIZED')
        .then(() => {
          if (getters.isAdmin)
            resolve()
          else
            reject()
        })
        .catch(() => {
          reject()
        })
      })
    },
    LOAD_USERNAME({commit}) {
      commit('LOAD_USERNAME')
    },
    AUTH_REQUEST({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        const url = '/backend/modules/auth/login'
        axios({ url: url, data: user, method: 'POST' })
        .then(resp => {
          if (resp.data.firstname != undefined && resp.data.lastname != undefined) {
            commit('SET_USER', resp.data)
            commit('SET_PROCESSING', false)
            resolve()
          } else if (resp.data.password != undefined) {
            commit('SET_PROCESSING', false)
            reject('password')
          } else {
            reject()
          }
        },
        err => {
          commit('SET_PROCESSING', false)
          reject(err)
        })
      })
    },
    AUTH_LOGOUT({commit}) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        const url = '/backend/modules/auth/logout'
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
    REG_REQUEST({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        const url = '/backend/modules/auth/signup'
        axios({ url: url, data: user, method: 'POST' })
        .then(resp => {
          if (resp.data == 'success') {
            Vue.$cookies.set('email', user.email, '1m')
            commit('SET_PROCESSING', false)
            resolve()
          } else if (resp.data.email != undefined) {
            commit('SET_PROCESSING', false)
            reject('email')
          } else {
            commit('SET_PROCESSING', false)
            reject()
          }
        },
        err => {
          commit('SET_PROCESSING', false)
          reject(err)
        })
      })
    },
    LOAD_ACCOUNT({commit}) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        const url = '/backend/modules/account'
        axios({ url: url, method: 'GET' })
        .then(resp => {
          commit('SET_USER_ACCOUNT', resp.data)
          commit('SET_PROCESSING', false)
          resolve()
        })
        .catch(err => {
          commit('SET_PROCESSING', false)
          reject(err)
        })
      })
    },
    UPDATE_USER({commit}, data) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        const url = '/backend/modules/account/update'
        axios({ url: url, data: data, method: 'POST' })
        .then(() => {
          commit('SET_USER_ACCOUNT', data)
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
          const url = '/backend/modules/auth/resend'
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
    SEND_PASSWORD_LINK({commit}) {
      return new Promise((resolve, reject) => {
        resolve()
        // if (Vue.$cookies.get('email') != null) {
        //   commit('SET_PROCESSING', true)
        //   const url = '/modules/auth/resend'
        //   axios({ url: url, data: Vue.$cookies.get('email'), method: 'POST' })
        //   .then(() => {
        //     commit('SET_PROCESSING', false)
        //     resolve()
        //   })
        //   .catch(err => {
        //     commit('SET_PROCESSING', false)
        //     reject(err)
        //   })
        // }
      })
    }
  },
  getters: {
    name: state => state.name,
    surname: state => state.surname,
    middlename: state => state.middlename,
    isAuthenticated: state => state.isAuthenticated,
    isAdmin: state => state.isAdmin,
    limit: state => state.limit,
    order: state => state.order,
    start: state => state.start,
    end: state => state.end,
  }
}