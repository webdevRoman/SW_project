import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMask from 'v-mask'
import vSelect from 'vue-select'

Vue.config.productionTip = false

Vue.use(VueMask);

vSelect.props.components.default = () => ({
  OpenIndicator: {
    render: createElement =>  createElement('div', {class: {'select-arrow': true}})
  }
})
Vue.component('v-select', vSelect)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
