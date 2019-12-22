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
        li.nav-item
          button.cart
            .cart-img
              img(src="../assets/img/cart.svg", alt="Cart image")
            .cart-sum 100 Р
</template>

<script>
export default {
  
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
    .logo
      font-size: 40px
      font-weight: bold
      text-transform: uppercase
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
</style>