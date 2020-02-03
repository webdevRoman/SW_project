import Vue from 'vue'
import axios from 'axios'

export default {
  state: {
    date: '',
    // categories: [{
    //   name: 'Название категории 1',
    //   dishes: [{
    //     id: 1,
    //     name: 'Бигус',
    //     price: 85,
    //     weight: 250,
    //     weighty: 0,
    //     single: 1,
    //     description: 'Капуста тушеная со свининой',
    //     hide: 0,
    //     image: '/images/delivery/items/199.jpg',
    //     order: 0,
    //     favourite: false
    //   }, {
    //     id: 2,
    //     name: 'Салат "Витаминный"',
    //     price: 32,
    //     weight: 150,
    //     weighty: 0,
    //     single: 1,
    //     description: 'Lorem ipsum, or lipsum as it is sometimes known',
    //     hide: 0,
    //     image: '/images/delivery/items/199.jpg',
    //     order: 0,
    //     favourite: true
    //   }, {
    //     id: 3,
    //     name: 'Овощи на пару',
    //     price: 53,
    //     weight: 100,
    //     weighty: 1,
    //     single: 0,
    //     description: 'Зеленый горошек, брокколи, цветная капуста, картофель, морковь, перец болгарский, стручковая фасоль, чеснок',
    //     hide: 0,
    //     image: '/images/delivery/items/199.jpg',
    //     order: 0,
    //     favourite: true
    //   }, {
    //     id: 4,
    //     name: 'Окорочок фаршированный',
    //     price: 53,
    //     weight: 80,
    //     weighty: 0,
    //     single: 0,
    //     description: 'Куриный фарш, грибы, специи',
    //     hide: 0,
    //     image: '/images/delivery/items/199.jpg',
    //     order: 0,
    //     favourite: false
    //   }, {
    //     id: 5,
    //     name: 'Вок с курицей',
    //     price: 135,
    //     weight: 250,
    //     weighty: 0,
    //     single: 1,
    //     description: 'Лапша удон, куриное филе, лук репчатый, лук зеленый, перец болгарский, морковь, капуста, чеснок, кунжут',
    //     hide: 0,
    //     image: '/images/delivery/items/199.jpg',
    //     order: 0,
    //     favourite: true
    //   }]
    // }, {
    //   name: 'Название категории 2',
    //   dishes: [{
    //     id: 6,
    //     name: 'Салат "Овощное попурри"',
    //     price: 36,
    //     weight: 100,
    //     weighty: 0,
    //     single: 1,
    //     description: 'Капуста, помидор, огурцы, масло',
    //     hide: 0,
    //     image: '/images/delivery/items/199.jpg',
    //     order: 0,
    //     favourite: true
    //   }, {
    //     id: 7,
    //     name: 'Салат "Цезарь" с пекинской капустой',
    //     price: 66,
    //     weight: 100,
    //     weighty: 1,
    //     single: 0,
    //     description: 'Помидоры, сыр, курица, пекинская капуста, соус "Цезарь"',
    //     hide: 0,
    //     image: '/images/delivery/items/199.jpg',
    //     order: 0,
    //     favourite: false
    //   }]
    // }, {
    //   name: 'Название категории 3',
    //   dishes: [{
    //     id: 8,
    //     name: 'Суп "Том Ям" с морепродуктами',
    //     price: 154,
    //     weight: 250,
    //     weighty: 1,
    //     single: 0,
    //     description: 'Морепродукты, корень галангала, лемонграсс, сливки, кокосовое молоко, шампиньоны, красный лук, помидоры, кинза, соус Том Ям. Подается с рисом.',
    //     hide: 0,
    //     image: '/images/delivery/items/199.jpg',
    //     order: 0,
    //     favourite: false
    //   }, {
    //     id: 9,
    //     name: 'Салат 9',
    //     price: 32,
    //     weight: 150,
    //     weighty: 0,
    //     single: 1,
    //     description: 'Lorem ipsum, or lipsum as it is sometimes known',
    //     hide: 1,
    //     image: '/images/delivery/items/199.jpg',
    //     order: 0,
    //     favourite: true
    //   }, {
    //     id: 10,
    //     name: 'Салат 10',
    //     price: 32,
    //     weight: 150,
    //     weighty: 0,
    //     single: 1,
    //     description: 'Lorem ipsum, or lipsum as it is sometimes known',
    //     hide: 1,
    //     image: '/images/delivery/items/199.jpg',
    //     order: 0,
    //     favourite: true
    //   }]
    // }, {
    //   name: 'Длинное название категории (не вмещается в одну строку)',
    //   dishes:[]
    // }, {
    //   name: '5',
    //   dishes:[]
    // }, {
    //   name: '6',
    //   dishes:[]
    // }, {
    //   name: '7',
    //   dishes:[]
    // }, {
    //   name: '8',
    //   dishes:[]
    // }, {
    //   name: '9',
    //   dishes:[]
    // }],
    categories: [],
    meta: {},
    links: {},
    favourites: {},
    cart: {}
  },
  mutations: {
    SET_DATE(state, date) {
      state.date = date
    },
    SET_CATEGORIES(state, data) {
      let categories = []
      if (data != 'err') {
        data.categories.forEach(cat => {
          categories.push({ id: cat.id, name: cat.name, dishes: [] })
        })
        data.dishes.forEach(dish => {
          for (let i = 0; i < categories.length; i++) {
            if (dish.category == categories[i].name) {
              categories[i].dishes.push(dish)
              break
            }
          }
        })
        state.meta = data._meta
        state.links = data._links
      }
      state.categories = categories
    },
    SET_FAVOURITES(state, data) {
      if (data != 'err') {
        data.dishes.forEach(dish => {
          Vue.set(state.favourites, dish.id, dish)
        })
      } else {
        state.favourites = {}
      }
    },
    ADD_FAVOURITE(state, dish) {
      Vue.set(state.favourites, dish.id, dish)
    },
    REMOVE_FAVOURITE(state, dish) {
      let newFavs = state.favourites
      Vue.set(state.favourites, dish.id, null)
      delete newFavs[dish.id]
      state.favourites = newFavs
      for (let i = 0; i < state.categories.length; i++) {
        for (let j = 0; j < state.categories[i].dishes.length; j++) {
          const d = state.categories[i].dishes[j]
          if (d.id == dish.id)
            Vue.set(state.categories[i].dishes[j], 'elect', false)
        }
      }
    },
    SET_CART(state, data) {
      if (data != 'err') {
        data.dishes.forEach(dish => {
          Vue.set(state.cart, dish.id, dish)
        })
      } else {
        state.cart = {}
      }
    },
    SET_OREDER(state, data) {
      data.dish.amount = data.amount
      if (data.amount != 0) {
        state.cart[data.dish.id] = data.dish
      } else {
        let newCart = state.cart
        delete newCart[data.dish.id]
        state.cart = newCart
      }
      // Vue.set(state.cart, data.dish.id, data.dish)
    }
  },
  actions: {
    SET_DATE({commit}, date) {
      commit('SET_DATE', date)
    },
    LOAD_DISHES({commit}, data) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        let requestParams = {}
        // if (data.link == undefined) {
          const url = '/modules/menu'
          const parameters = {}
          parameters.date = data.date
          if (data.category != 'all')
            parameters.category = data.category
          parameters.page = data.page
          requestParams = {
            url: url,
            method: 'GET',
            params: parameters
          }
        // } else {
        //   requestParams = { url: data.link, method: 'GET' }
        // }
        axios(requestParams)
        .then(resp => {
          commit('SET_CATEGORIES', resp.data)
          commit('SET_PROCESSING', false)
          resolve()
        })
        .catch(err => {
          commit('SET_CATEGORIES', 'err')
          commit('SET_PROCESSING', false)
          reject(err)
        })
      })
    },
    LOAD_FAVOURITES({commit}, date) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        let requestParams = {}
        const url = '/modules/account/elect'
        requestParams = {
          url: url,
          method: 'GET',
          params: { date: date }
        }
        axios(requestParams)
        .then(resp => {
          commit('SET_FAVOURITES', resp.data)
          commit('SET_PROCESSING', false)
          resolve()
        })
        .catch(err => {
          commit('SET_FAVOURITES', 'err')
          commit('SET_PROCESSING', false)
          reject(err)
        })
      })
    },
    TOGGLE_FAVOURITE({commit}, data) {
      commit('SET_PROCESSING', true)
      axios({ url: '/modules/account/edit', data: { id: data.dish.id }, method: 'POST' })
      .then(resp => {
        if (data.remove)
          commit('REMOVE_FAVOURITE', data.dish)
        else
          commit('ADD_FAVOURITE', data.dish)
        commit('SET_PROCESSING', false)
      })
      .catch(err => {
        commit('SET_PROCESSING', false)
      })
    },
    LOAD_CART({commit}, date) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        let requestParams = {}
        const url = '/modules/basket'
        requestParams = {
          url: url,
          method: 'GET',
          params: { date: date }
        }
        axios(requestParams)
        .then(resp => {
          commit('SET_CART', resp.data)
          commit('SET_PROCESSING', false)
          resolve()
        })
        .catch(err => {
          commit('SET_CART', 'err')
          commit('SET_PROCESSING', false)
          reject(err)
        })
      })
    },
    SET_OREDER({commit, getters}, data) {
      commit('SET_PROCESSING', true)
      let parameters = { data: { date: getters.date, id: data.dish.id }, method: 'POST' }
      if (data.amount != 0) {
        parameters.url = '/modules/basket/add'
        parameters.data.amount = data.amount
      } else {
        parameters.url = '/modules/basket/delete'
      }
      axios(parameters)
      .then(resp => {
        data.dish.amount = data.amount
        commit('SET_OREDER', data)
        commit('SET_PROCESSING', false)
      })
      .catch(err => {
        commit('SET_PROCESSING', false)
      })
    }
  },
  getters: {
    date: (state) => state.date,
    categories: (state) => state.categories,
    favourites: (state) => state.favourites,
    cart: (state) => state.cart
  }
}