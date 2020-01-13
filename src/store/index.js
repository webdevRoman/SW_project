import Vue from 'vue'
import Vuex from 'vuex'
import dishesModule from './dishes'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    dishesModule
  }
})
