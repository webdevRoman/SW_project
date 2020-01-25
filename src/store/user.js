// import Vue from 'vue'
// import axios from 'axios'

export default {
  state: {
    token: '',
    name: 'Волк',
    surname: 'Цирков',
    middlename: '',
    // testData: null
  },
  mutations: {
    // LOAD_DATA(state, data) {
    //   Vue.set(state, 'testData', data)
    // }
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
    // }
  },
  getters: {
    name: state => state.name,
    surname: state => state.surname,
    middlename: state => state.middlename
  }
}