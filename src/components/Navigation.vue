<template lang="pug">
.navigation
  .container
    .logo Логотип
    .right
      ul.nav
        li.nav-item.nav-item_active
          router-link(to="/") Меню
        li.nav-item
          router-link(to="/") Избранное
        li.nav-item(@click.prevent="showCart()")
          button.cart
            .cart-img
              img(src="../assets/img/cart.svg", alt="Cart image")
            .cart-sum 100 Р
  .cart-popup
    .cart-close
      button.cart-close__btn(@click.prevent="hideCart()") &times;
    // .cart-items__no Ваша корзина пуста
    .cart-items
      .cart-item
        .cart-item__block
          .cart-item__main
            .cart-item__img
              img(src="../assets/img/dish.svg", alt="Dish image")
            .cart-item__text
              .cart-item__info
                .cart-item__price 25 Р
                .cart-item__name Название
                .cart-item__number
                  //- button.cart-number__btn(@click.prevent="dish.orderNumber--", :disabled="dish.orderNumber <= 1") -
                  //- input.cart-number__value(type="text", v-model="dish.orderNumber", v-mask="'##'", @focusout="checkOrderNumber(dish)")
                  //- button.cart-number__btn(@click.prevent="dish.orderNumber++", :disabled="dish.orderNumber >= 99") +
                  button.cart-number__btn -
                  input.cart-number__value(type="text", v-mask="'##'", value="2")
                  button.cart-number__btn +
                //- button.cart-item__fav(@click.prevent="dish.favourite = !dish.favourite")
                //-   img(src="../assets/img/star-active.svg", alt="Star image", v-if="dish.favourite")
                //-   img(src="../assets/img/star.svg", alt="Star image", v-else)
                button.cart-item__fav
                  .cart-fav__img
                    img(src="../assets/img/star.svg", alt="Star image")
                  .cart-fav__text В избранное
                //- button.cart-item__fav.cart-item__fav_active
                //-   .cart-fav__img
                //-     img(src="../assets/img/star-active.svg", alt="Star image", v-if="dish.favourite")
                //-   .cart-fav__text В избранном
          button.cart-item__delete &times;
        .cart-item__sum
          div Всего: <span class="cart-sum__value">50</span> Р
      .cart-item
        .cart-item__block
          .cart-item__main
            .cart-item__img
              img(src="../assets/img/dish.svg", alt="Dish image")
            .cart-item__text
              .cart-item__info
                .cart-item__price 25 Р
                .cart-item__name Название
                .cart-item__number
                  //- button.cart-number__btn(@click.prevent="dish.orderNumber--", :disabled="dish.orderNumber <= 1") -
                  //- input.cart-number__value(type="text", v-model="dish.orderNumber", v-mask="'##'", @focusout="checkOrderNumber(dish)")
                  //- button.cart-number__btn(@click.prevent="dish.orderNumber++", :disabled="dish.orderNumber >= 99") +
                  button.cart-number__btn -
                  input.cart-number__value(type="text", v-mask="'##'", value="2")
                  button.cart-number__btn +
                //- button.cart-item__fav(@click.prevent="dish.favourite = !dish.favourite")
                //-   img(src="../assets/img/star-active.svg", alt="Star image", v-if="dish.favourite")
                //-   img(src="../assets/img/star.svg", alt="Star image", v-else)
                button.cart-item__fav
                  .cart-fav__img
                    img(src="../assets/img/star.svg", alt="Star image")
                  .cart-fav__text В избранное
                //- button.cart-item__fav.cart-item__fav_active
                //-   .cart-fav__img
                //-     img(src="../assets/img/star-active.svg", alt="Star image", v-if="dish.favourite")
                //-   .cart-fav__text В избранном
          button.cart-item__delete &times;
        .cart-item__sum
          div Всего: <span class="cart-sum__value">50</span> Р
      .cart-item
        .cart-item__block
          .cart-item__main
            .cart-item__img
              img(src="../assets/img/dish.svg", alt="Dish image")
            .cart-item__text
              .cart-item__info
                .cart-item__price 25 Р
                .cart-item__name Название
                .cart-item__number
                  //- button.cart-number__btn(@click.prevent="dish.orderNumber--", :disabled="dish.orderNumber <= 1") -
                  //- input.cart-number__value(type="text", v-model="dish.orderNumber", v-mask="'##'", @focusout="checkOrderNumber(dish)")
                  //- button.cart-number__btn(@click.prevent="dish.orderNumber++", :disabled="dish.orderNumber >= 99") +
                  button.cart-number__btn -
                  input.cart-number__value(type="text", v-mask="'##'", value="2")
                  button.cart-number__btn +
                //- button.cart-item__fav(@click.prevent="dish.favourite = !dish.favourite")
                //-   img(src="../assets/img/star-active.svg", alt="Star image", v-if="dish.favourite")
                //-   img(src="../assets/img/star.svg", alt="Star image", v-else)
                button.cart-item__fav
                  .cart-fav__img
                    img(src="../assets/img/star.svg", alt="Star image")
                  .cart-fav__text В избранное
                //- button.cart-item__fav.cart-item__fav_active
                //-   .cart-fav__img
                //-     img(src="../assets/img/star-active.svg", alt="Star image", v-if="dish.favourite")
                //-   .cart-fav__text В избранном
          button.cart-item__delete &times;
        .cart-item__sum
          div Всего: <span class="cart-sum__value">50</span> Р
    .cart-price
      .cart-price__line.cart-price__sum
        .cart-price__text Итого
        .cart-price__value <span class="cart-value__value">100</span> Р
      .cart-price__line.cart-price__left
        .cart-price__text Оставшийся лимит
        .cart-price__value <span class="cart-value__value">100</span> Р
    .cart-buttons
      button.btn.btn_o Очистить корзину
      button.btn Подтвердить заказ
</template>

<script>
export default {
  methods: {
    showCart() {
      const cart = document.querySelector('.cart-popup')
      cart.style.display = 'block'
    },
    hideCart() {
      const cart = document.querySelector('.cart-popup')
      cart.style.display = 'none'
    }
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
          a
            font-weight: 500
            font-size: $fz-subtitle
            text-transform: uppercase
            color: $c-dark
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
      margin-left: 20px
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
      .cart-price__text
      .cart-price__value
        font-weight: bold
  &-buttons
    padding: 26px 38px 38px 38px
    display: flex
    justify-content: center
    align-items: center
    .btn:first-child
      margin-right: 20px
</style>