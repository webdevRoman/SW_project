import Vue from 'vue'

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
        id: 5,
        name: 'Вок с курицей',
        price: 135,
        weight: 250,
        weighty: 0,
        single: 1,
        description: 'Лапша удон, куриное филе, лук репчатый, лук зеленый, перец болгарский, морковь, капуста, чеснок, кунжут',
        hide: 0,
        image: '/images/delivery/items/199.jpg',
        order: 0,
        favourite: true
      }]
    }, {
      name: 'Название категории 2',
      dishes: [{
        id: 6,
        name: 'Салат "Овощное попурри"',
        price: 36,
        weight: 100,
        weighty: 0,
        single: 1,
        description: 'Капуста, помидор, огурцы, масло',
        hide: 0,
        image: '/images/delivery/items/199.jpg',
        order: 0,
        favourite: true
      }, {
        id: 7,
        name: 'Салат "Цезарь" с пекинской капустой',
        price: 66,
        weight: 100,
        weighty: 1,
        single: 0,
        description: 'Помидоры, сыр, курица, пекинская капуста, соус "Цезарь"',
        hide: 0,
        image: '/images/delivery/items/199.jpg',
        order: 0,
        favourite: false
      }]
    }, {
      name: 'Название категории 3',
      dishes: [{
        id: 8,
        name: 'Суп "Том Ям" с морепродуктами',
        price: 154,
        weight: 250,
        weighty: 1,
        single: 0,
        description: 'Морепродукты, корень галангала, лемонграсс, сливки, кокосовое молоко, шампиньоны, красный лук, помидоры, кинза, соус Том Ям. Подается с рисом.',
        hide: 0,
        image: '/images/delivery/items/199.jpg',
        order: 0,
        favourite: false
      }, {
        id: 9,
        name: 'Салат 9',
        price: 32,
        weight: 150,
        weighty: 0,
        single: 1,
        description: 'Lorem ipsum, or lipsum as it is sometimes known',
        hide: 1,
        image: '/images/delivery/items/199.jpg',
        order: 0,
        favourite: true
      }, {
        id: 10,
        name: 'Салат 10',
        price: 32,
        weight: 150,
        weighty: 0,
        single: 1,
        description: 'Lorem ipsum, or lipsum as it is sometimes known',
        hide: 1,
        image: '/images/delivery/items/199.jpg',
        order: 0,
        favourite: true
      }]
    }],
    favourites: {},
    cart: {}
  },
  mutations: {
    SET_FAVOURITES(state) {
      state.categories.forEach(category => {
        category.dishes.forEach(dish => {
          if (dish.favourite)
            Vue.set(state.favourites, dish.id, dish)
        })
      })
    },
    ADD_FAVOURITE(state, dish) {
      Vue.set(state.favourites, dish.id, dish)
    },
    REMOVE_FAVOURITE(state, dish) {
      let newFavs = state.favourites
      Vue.set(state.favourites, dish.id, null)
      delete newFavs[dish.id]
      state.favourites = newFavs
    },
    DECREMENT_OREDER(state, dish) {
      if (dish.order < 1) {
        let newCart = state.cart
        delete newCart[dish.id]
        state.cart = newCart
      } else {
        Vue.set(state.cart, dish.id, dish)
      }
    },
    SET_OREDER(state, dish) {
      Vue.set(state.cart, dish.id, dish)
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