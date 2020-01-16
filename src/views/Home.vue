<template lang="pug">
div
  Header
  //- Navigation
  .navigation
    .container
      .logo Логотип
      .right
        ul.nav
          li.nav-item(:class="{'nav-item_active': !showFavourites}", @click.prevent="showFavourites = false") Меню
          li.nav-item(:class="{'nav-item_active': showFavourites}", @click.prevent="showFavourites = true") Избранное
          li.nav-item(@click.prevent="showCart()")
            button.cart
              .cart-img
                img(src="../assets/img/cart.svg", alt="Cart image")
              .cart-sum {{ currentSum }} Р
    Cart
  .image(:class="{'image_favourites': showFavourites}")
    img(src="../assets/img/apricot-fruits-on-bowl-1028599 (1) 2.png", alt="Dish image", v-if="showFavourites")
    img(src="../assets/img/top-dish.png", alt="Dish image", v-else)
  Weekdays
  Favourites(v-if="showFavourites")
  Dishes(v-else)
  Footer
</template>

<script>
import Header from '../components/Header'
import Cart from '../components/Cart'
import Weekdays from '../components/Weekdays'
import Favourites from '../components/Favourites'
import Dishes from '../components/Dishes'
import Footer from '../components/Footer'

export default {
  name: 'home',
  data() {
    return {
      showFavourites: false
    }
  },
  methods: {
    showCart() {
      const cart = document.querySelector('.cart-popup')
      cart.style.display = 'block'
    }
  },
  computed: {
    cartItems() {
      return this.$store.getters.cart
    },
    currentSum() {
      let sum = 0
      for (const key in this.cartItems) {
        sum += this.cartItems[key].price * this.cartItems[key].order
      }
      return sum
    }
  },
  components: {
    Header,
    Cart,
    // Navigation,
    Weekdays,
    Favourites,
    Dishes,
    Footer
  }
}
</script>

<style scoped lang="sass">
@import "../assets/sass/vars"

.navigation
  padding: 15px
  .container
    display: flex
    justify-content: space-between
    align-items: center
    .right
      display: flex
      justify-content: flex-end
      align-items: center
      .nav
        display: flex
        justify-content: flex-end
        &-item
          margin-left: 75px
          position: relative
          font-weight: 500
          font-size: $fz-subtitle
          text-transform: uppercase
          color: $c-dark
          cursor: pointer
          &:after
            display: none
            content: ''
            width: 8px
            height: 8px
            background-color: $c-active
            border-radius: 50%
            position: absolute
            bottom: -12px
            left: 50%
            margin-left: -4px
          &_active:after
            display: block
          &:hover:after
            display: block
      .cart
        display: flex
        justify-content: flex-end
        align-items: center
        &-img
          width: 28px
          margin-right: 9px
        &-sum
          font-weight: 500
          font-size: $fz-subtitle
          color: $c-dark

.image
  display: flex
  justify-content: flex-end
  height: 240px
  background-color: $c-middle
  &_favourites
    background-color: #E8ECEF
  img
    width: auto
    height: 100%
</style>