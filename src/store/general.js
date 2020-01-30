export default {
  state: {
    processing: false,
    status: ''
  },
  mutations: {
    SET_PROCESSING(state, payload) {
      state.processing = payload
    }
  },
  actions: {
    
  },
  getters: {
    processing: state => state.processing,
    status: state => state.status
  }
}