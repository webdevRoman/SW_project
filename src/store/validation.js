import Vue from 'vue'

export default {
  state: {
    errors: {},
    emailMask: /^[\w.]{1,34}@smartworld.team$/,
    passwordMask: /^[A-Za-z0-9]{6,25}$/
  },
  mutations: {
    CHECK_EMAIL(state, email) {
      Vue.set(state.errors, 'email', undefined)
      if (email.length == 0) {
        Vue.set(state.errors, 'email', 'empty')
      } else if (email.length > 50) {
        Vue.set(state.errors, 'email', 'long')
      } else if (!email.match(state.emailMask)) {
        Vue.set(state.errors, 'email', 'wrong')
      }
    },
    CHECK_PASSWORD(state, password) {
      Vue.set(state.errors, 'password', undefined)
      if (password.length == 0) {
        Vue.set(state.errors, 'password', 'empty')
      } else if (password.length < 6) {
        Vue.set(state.errors, 'password', 'short')
      } else if (password.length > 25) {
        Vue.set(state.errors, 'password', 'long')
      } else if (!password.match(state.passwordMask)) {
        Vue.set(state.errors, 'password', 'wrong')
      }
    },
    CHECK_PASSWORD_REPEAT(state, password) {
      Vue.set(state.errors, 'passwordRepeat', undefined)
      if (password.passwordRepeat.length == 0) {
        Vue.set(state.errors, 'passwordRepeat', 'empty')
      } else if (password.password !== password.passwordRepeat) {
        Vue.set(state.errors, 'passwordRepeat', 'wrong')
      }
    },
  },
  actions: {
    CHECK_EMAIL({commit, getters}, email) {
      commit('CHECK_EMAIL', email)
      return new Promise((resolve) => {
        if (getters.errors.email != '')
          resolve(getters.errors.email)
        else
          resolve('correct')
      })
    },
    CHECK_PASSWORD({commit, getters}, password) {
      commit('CHECK_PASSWORD', password)
      return new Promise((resolve) => {
        if (getters.errors.password != '')
          resolve(getters.errors.password)
        else
          resolve('correct')
      })
    },
    CHECK_PASSWORD_REPEAT({commit, getters}, passwords) {
      commit('CHECK_PASSWORD_REPEAT', passwords)
      return new Promise((resolve) => {
        if (getters.errors.passwordRepeat != '')
          resolve(getters.errors.passwordRepeat)
        else
          resolve('correct')
      })
    },
  },
  getters: {
    errors: (state) => state.errors
  }
}