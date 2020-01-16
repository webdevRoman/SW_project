<template lang="pug">
.cart-popup
  .cart-close
    button.cart-close__btn(@click.prevent="hideCart()") &times;
  .cart-items__confirmed(v-if="isConfirmed") Заказ подтвержден
  .cart-items__no(v-else-if="Object.keys(cartItems).length < 1") Ваша корзина пуста
  .cart-items(v-else)
    .cart-item(v-for="dish in cartItems")
      .cart-item__block
        .cart-item__main
          .cart-item__img
            img(src="../assets/img/dish.svg", alt="Dish image")
          .cart-item__text
            .cart-item__info
              .cart-item__price {{ dish.price }} Р
              .cart-item__name {{ dish.name }}
              .cart-item__number
                button.cart-number__btn(@click.prevent="decrementOrder(dish)", :disabled="dish.order <= 0") -
                input.cart-number__value(type="text", v-model="dish.order", v-mask="'##'", @focusout="checkOrder(dish)")
                button.cart-number__btn(@click.prevent="incrementOrder(dish)", :disabled="dish.order >= 99") +
              button.cart-item__fav(@click.prevent="toggleFavourite(dish)", v-if="dish.favourite")
                .cart-fav__img
                  img(src="../assets/img/star-active.svg", alt="Star image")
                .cart-fav__text В избранном
              button.cart-item__fav.cart-item__fav_active(@click.prevent="toggleFavourite(dish)", v-else)
                .cart-fav__img
                  img(src="../assets/img/star.svg", alt="Star image")
                .cart-fav__text В избранное
        button.cart-item__delete(@click.prevent="deleteOrder(dish)") &times;
      .cart-item__sum
        div Всего: <span class="cart-sum__value">{{ dish.price * dish.order }}</span> Р
  .cart-price(v-if="!isConfirmed")
    .cart-price__line.cart-price__sum
      .cart-price__text Итого
      .cart-price__value <span class="cart-value__value">{{ currentSum }}</span> Р
    .cart-price__line.cart-price__left(:class="{'cart-price__left_minus': currentSum > priceLimit}")
      .cart-price__text Оставшийся лимит
      .cart-price__value <span class="cart-value__value">{{ priceLimit - currentSum }}</span> Р
  .cart-buttons(v-if="!isConfirmed")
    button.btn.btn_o(@click.prevent="clearCart()", :disabled="Object.keys(cartItems).length < 1") Очистить корзину
    button.btn(@click.prevent="confirmOrder()", :disabled="Object.keys(cartItems).length < 1") Подтвердить заказ
</template>

<script>
export default {
  data() {
    return {
      priceLimit: 200,
      isConfirmed: false
    }
  },
  methods: {
    hideCart() {
      const cart = document.querySelector('.cart-popup')
      cart.style.display = 'none'
    },
    incrementOrder(dish) {
      dish.order++
      this.$store.dispatch('SET_OREDER', dish)
    },
    decrementOrder(dish) {
      dish.order--
      this.$store.dispatch('DECREMENT_OREDER', dish)
    },
    deleteOrder(dish) {
      dish.order = 0
      this.$store.dispatch('DECREMENT_OREDER', dish)
    },
    checkOrder(dish) {
      if (dish.order == '' || !dish.order.match(/\d+/)) {
        dish.order = 0
        this.$store.dispatch('DECREMENT_OREDER', dish)
      } else if (dish.order.length > 1 && dish.order[0] == '0') {
        dish.order = dish.order[1]
        dish.order = parseInt(dish.order)
        this.$store.dispatch('SET_OREDER', dish)
      } else {
        this.$store.dispatch('SET_OREDER', dish)
      }
    },
    toggleFavourite(dish) {
      if (!dish.favourite) {
        this.$store.dispatch('ADD_FAVOURITE', dish)
        dish.favourite = true
      } else {
        this.$store.dispatch('REMOVE_FAVOURITE', dish)
        dish.favourite = false
      }
    },
    clearCart() {
      for (const key in this.cartItems) {
        const dish = this.cartItems[key]
        dish.order = 0
        this.$store.dispatch('DECREMENT_OREDER', dish)
      }
    },
    confirmOrder() {
      // dispatch some confirming method
      this.isConfirmed = true
      for (const key in this.cartItems) {
        const dish = this.cartItems[key]
        dish.order = 0
        this.$store.dispatch('DECREMENT_OREDER', dish)
      }
      const cart = document.querySelector('.cart-popup')
      setTimeout(() => {
        cart.style.display = 'none'        
      }, 3000)
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
  }
}
</script>

<style scoped lang="sass">
@import "../assets/sass/vars"

.cart
  &-popup
    display: none
    width: 468px
    height: 100vh
    background-color: $c-bg
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.25)
    position: absolute
    top: 0
    right: 0
    overflow: hidden
  &-close
    height: 30px
    padding: 0 13px
    background-color: $c-dark
    display: flex
    justify-content: flex-end
    &__btn
      font-weight: 300
      font-size: 34px
      color: $c-light
      margin-top: -8px
  &-items
    height: calc(100vh - 250px)
    overflow-y: scroll
    &::-webkit-scrollbar
      width: 4px
    &::-webkit-scrollbar-button
      height: 0
    &::-webkit-scrollbar-track
      background-color: $c-middle
    &::-webkit-scrollbar-track-piece
      background-color: $c-middle
    &::-webkit-scrollbar-thumb
      height: 50px
      background-color: $c-dark
    &::-webkit-scrollbar-corner
      background-color: $c-dark
    &::-webkit-resizer
      background-color: $c-dark
    &__no
      height: calc(100vh - 250px)
      padding: 50px 0
      font-weight: bold
      font-size: 24px
      text-align: center
    &__confirmed
      padding: 50px 0
      font-weight: bold
      font-size: 24px
      text-align: center
  &-item
    padding: 20px 25px
    border-bottom: 1px solid $c-middle
    &:last-child
      border-bottom: none
    &__block
      display: flex
      justify-content: space-between
      align-items: flex-start
    &__main
      display: flex
      margin-bottom: 20px
    &__img
      box-sizing: border-box
      flex-basis: 134px
      padding: 20px
      border: 2px solid $c-middle
      margin-right: 40px
    &__text
      display: flex
      justify-content: space-between
    &__price
      font-weight: bold
      font-size: 15px
      margin-bottom: 7px
    &__name
      font-weight: bold
      font-size: 15px
      margin-bottom: 30px
    &__number
      display: flex
      align-items: center
      margin-bottom: 10px
    &__fav
      display: flex
      justify-content: space-between
      align-items: center
      padding: 5px 8px
      border: 1px solid $c-dark
      &:hover
        .cart-fav__img
          transform: scale(1.3)
    &__delete
      font-weight: 300
      font-size: 34px
      color: $c-middle
      margin-top: -10px
    &__sum
      display: flex
      justify-content: flex-end
      font-weight: bold
      font-size: 15px
  &-number
    &__btn
      font-weight: 500
      font-size: 15px
      margin-right: 10px
      transition: 0.2s
      &:last-child
        margin-right: 0
      &:hover
        transform: scale(1.8)
    &__value
      width: 20px
      background-color: transparent
      border: none
      font-weight: 500
      font-size: 15px
      text-align: center
      margin-right: 10px
  &-fav
    &__img
      width: 23px
      margin-right: 9px
      transition: 0.2s
    &__text
      font-size: 13px
  &-sum
    &__value
      margin-left: 6px
  &-price
    padding: 20px 25px
    border-top: 1px solid $c-middle
    border-bottom: 1px solid $c-middle
    &__line
      display: flex
      justify-content: space-between
      align-items: center
    &__sum
      font-weight: bold
      margin-bottom: 14px
      .cart-price__text
        font-size: 24px
      .cart-price__value
        font-size: 20px
    &__left
      font-size: 20px
      color: $c-active
      .cart-price__value
        font-weight: bold
      &_minus
        color: #D84315
  &-buttons
    padding: 26px 38px 38px 38px
    display: flex
    justify-content: center
    align-items: center
    .btn:first-child
      margin-right: 20px
</style>