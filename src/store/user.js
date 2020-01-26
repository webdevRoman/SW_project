// import Vue from 'vue'
// import axios from 'axios'

export default {
  state: {
    token: '',
    name: 'Волк',
    surname: 'Цирков',
    middlename: '',
    isUserAuthenticated: true,
    // testData: null,
  },
  mutations: {
    // LOAD_DATA(state, data) {
    //   Vue.set(state, 'testData', data)
    // },
    SET_USER_AUTH(state, payload) {
      state.isUserAuthenticated = payload
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
    SET_USER_AUTH({commit}, payload) {
      commit('SET_USER_AUTH', payload)
    }
  },
  getters: {
    name: state => state.name,
    surname: state => state.surname,
    middlename: state => state.middlename,
    isUserAuthenticated: state => state.isUserAuthenticated
  }
}