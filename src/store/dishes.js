// import Vue from 'vue'

export default {
  state: {
    categories: [{
      name: 'Название категории 1',
      dishes: [{
        id: 1,
        name: 'Бигус',
        price: 85,
        weight: 250,
        weighty: 0,
        single: 1,
        description: 'Капуста тушеная со свининой',
        hide: 0,
        image: '/images/delivery/items/199.jpg',
        order: 0,
        favourite: false
      }, {
        id: 2,
        name: 'Салат "Витаминный"',
        price: 32,
        weight: 150,
        weighty: 0,
        single: 1,
        description: 'Lorem ipsum, or lipsum as it is sometimes known',
        hide: 0,
        image: '/images/delivery/items/199.jpg',
        order: 0,
        favourite: true
      }, {
        id: 3,
        name: 'Овощи на пару',
        price: 53,
        weight: 100,
        weighty: 1,
        single: 0,
        description: 'Зеленый горошек, брокколи, цветная капуста, картофель, морковь, перец болгарский, стручковая фасоль, чеснок',
        hide: 0,
        image: '/images/delivery/items/199.jpg',
        order: 0,
        favourite: true
      }, {
        id: 4,
        name: 'Окорочок фаршированный',
        price: 53,
        weight: 80,
        weighty: 0,
        single: 0,
        description: 'Куриный фарш, грибы, специи',
        hide: 0,
        image: '/images/delivery/items/199.jpg',
        order: 0,
        favourite: false
      }, {
        id: 2,
        name: 'Салат "Витаминный"',
        price: 32,
        weight: 150,
        weighty: 0,
        single: 1,
        description: 'Lorem ipsum, or lipsum as it is sometimes known',
        hide: 0,
        image: '/images/delivery/items/199.jpg',
        order: 0,
        favourite: true
      }]
    }, {
      name: 'Название категории 2',
      dishes: [{
        id: 1,
        name: 'Бигус',
        price: 85,
        weight: 250,
        weighty: 0,
        single: 1,
        description: 'Капуста тушеная со свининой',
        hide: 0,
        image: '/images/delivery/items/199.jpg',
        order: 0,
        favourite: true
      }, {
        id: 2,
        name: 'Салат "Витаминный"',
        price: 32,
        weight: 150,
        weighty: 0,
        single: 1,
        description: 'Lorem ipsum, or lipsum as it is sometimes known',
        hide: 0,
        image: '/images/delivery/items/199.jpg',
        order: 0,
        favourite: false
      }, {
        id: 3,
        name: 'Овощи на пару',
        price: 53,
        weight: 100,
        weighty: 1,
        single: 0,
        description: 'Зеленый горошек, брокколи, цветная капуста, картофель, морковь, перец болгарский, стручковая фасоль, чеснок',
        hide: 0,
        image: '/images/delivery/items/199.jpg',
        order: 0,
        favourite: false
      }]
    }, {
      name: 'Название категории 3',
      dishes: [{
        id: 1,
        name: 'Бигус',
        price: 85,
        weight: 250,
        weighty: 0,
        single: 1,
        description: 'Капуста тушеная со свининой',
        hide: 0,
        image: '/images/delivery/items/199.jpg',
        order: 0,
        favourite: false
      }, {
        id: 3,
        name: 'Овощи на пару',
        price: 53,
        weight: 100,
        weighty: 1,
        single: 0,
        description: 'Зеленый горошек, брокколи, цветная капуста, картофель, морковь, перец болгарский, стручковая фасоль, чеснок',
        hide: 0,
        image: '/images/delivery/items/199.jpg',
        order: 0,
        favourite: false
      }]
    }],
    favourites: new Map(),
    cart: new Map()
  },
  mutations: {
    SET_FAVOURITES(state) {
      let favourites = new Map()
      state.categories.forEach(category => {
        category.dishes.forEach(dish => {
          if (dish.favourite)
            favourites.set(dish.id, dish)
        })
      })
      state.favourites = favourites
    },
    ADD_FAVOURITE(state, dish) {
      // Vue.set(state.favourites, dish.id, dish)
      state.favourites.set(dish.id, dish)
    },
    REMOVE_FAVOURITE(state, dish) {
      state.favourites.delete(dish.id)
    },
    DECREMENT_OREDER(state, dish) {
      if (dish.order < 1)
        state.cart.delete(dish.id)
      else
        state.cart.set(dish.id, dish)
    },
    SET_OREDER(state, dish) {
      state.cart.set(dish.id, dish)
    }
  },
  actions: {
    SET_FAVOURITES({commit}) {
      commit('SET_FAVOURITES')
    },
    ADD_FAVOURITE({commit}, dish) {
      commit('ADD_FAVOURITE', dish)
    },
    REMOVE_FAVOURITE({commit}, dish) {
      commit('REMOVE_FAVOURITE', dish)
    },
    DECREMENT_OREDER({commit}, dish) {
      commit('DECREMENT_OREDER', dish)
    },
    SET_OREDER({commit}, dish) {
      commit('SET_OREDER', dish)
    }
  },
  getters: {
    categories: (state) => state.categories,
    favourites: (state) => state.favourites,
    cart: (state) => state.cart
  }
}