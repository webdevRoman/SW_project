<template lang="pug">
.dishes
  .container
    .select-container
      v-select.select(v-model="selectCategory", label="name", index="name", :options="selectCategories", :clearable="false", :searchable="false")
        template(v-slot:option="option")
          span.select-option {{ option.name }}
  .container
    .category(v-for="category in currentCategories")
      .title.category-title {{ category.name }}
      .category-dishes
        .dish(v-for="dish in category.dishes")
          .dish-top
            .dish-img
              img(src="../assets/img/dish.svg", alt="Dish image")
            .dish-title {{ dish.name }}
            .dish-descr {{ dish.description }}
          .dish-bottom
            .dish-info
              .dish-info__text
                span.dish-info__price {{ dish.price }} Р
                span.dish-info__weight {{ dish.weight }} г
              button.dish-info__show(@click.prevent="toggleDescr()")
                .dish-info__figure
            .dish-footer
              div(:class="{'dish-footer__cart': true, 'dish-footer__cart_active': dish.order > 0}")
                button.cart-btn(@click.prevent="incrementOrder(dish)", :disabled="dish.order > 0")
                  img(src="../assets/img/cart-active.svg", alt="Cart image", v-if="dish.order > 0")
                  img(src="../assets/img/cart.svg", alt="Cart image", v-else)
                div(:class="{'cart-number': true, 'cart-number_active': dish.order > 0}")
                  button.cart-number__btn(@click.prevent="decrementOrder(dish)", :disabled="dish.order <= 0") -
                  input.cart-number__value(type="text", v-model="dish.order", v-mask="'##'", @focusout="checkOrder(dish)")
                  button.cart-number__btn(@click.prevent="incrementOrder(dish)", :disabled="dish.order >= 99") +
              button.dish-footer__favourite(@click.prevent="toggleFavourite(dish)")
                img(src="../assets/img/star-active.svg", alt="Star image", v-if="dish.favourite")
                img(src="../assets/img/star.svg", alt="Star image", v-else)
</template>

<script>
export default {
  data() {
    return {
      selectCategory: { name: 'Все категории' }
    }
  },
  methods: {
    toggleFavourite(dish) {
      if (!dish.favourite) {
        this.$store.dispatch('ADD_FAVOURITE', dish)
        dish.favourite = true
      } else {
        this.$store.dispatch('REMOVE_FAVOURITE', dish)
        dish.favourite = false
      }
    },
    incrementOrder(dish) {
      dish.order++
      this.$store.dispatch('SET_OREDER', dish)
    },
    decrementOrder(dish) {
      dish.order--
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
    }
  },
  computed: {
    categories() {
      const categories = this.$store.getters.categories
      let newCategories = []
      categories.forEach(category => {
        let filteredDishes = []
        category.dishes.forEach(dish => {
          if (dish.hide == 0)
            filteredDishes.push(dish)
        })
        let newCategory = {}
        newCategory.name = category.name
        newCategory.dishes = filteredDishes
        newCategories.push(newCategory)
      })
      return newCategories
    },
    currentCategories() {
      if (this.selectCategory.name == 'Все категории')
        return this.categories
      else
        return this.categories.filter(c => c.name == this.selectCategory.name)
    },
    selectCategories() {
      let selectCategories = this.categories.slice()
      selectCategories.unshift({ name: 'Все категории' })
      return selectCategories
    }
  }
}
</script>

<style scoped lang="sass">
@import "../assets/sass/vars"
@import "../assets/sass/media-dishes"

.select-container
  height: 50px
  margin-bottom: 50px
.select
  width: 360px
  background-color: $c-bg
  font-size: 16px

.category
  margin-bottom: 80px
  &-title
    font-weight: bold
    font-size: 24px
    text-transform: uppercase
    margin-bottom: 30px
  &-dishes
    display: flex
    justify-content: space-between
    align-items: stretch
    flex-wrap: wrap
    &:after
      content: ''
      flex: auto
    .dish
      flex-basis: 262px
      display: flex
      justify-content: space-between
      flex-direction: column
      border: 2px solid $c-middle
      box-sizing: border-box
      text-align: center
      margin-right: 30px
      margin-bottom: 30px
      transition: 0.2s
      &:nth-child(4n)
        margin-right: 0
      &:hover
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1)
      &-img
        padding: 13px
        border-bottom: 2px solid $c-middle
        margin-bottom: 12px
        img
          width: 140px
      &-title
        width: 90%
        font-weight: bold
        font-size: 18px
        margin: 0 auto 25px auto
      &-descr
        width: 90%
        font-size: 13px
        line-height: 20px
        margin: 0 auto 25px auto
      &-info
        margin-bottom: 15px
        &__price
          font-weight: bold
          font-size: 18px
          vertical-align: middle
          margin-right: 10px
        &__weight
          font-size: 13px
          vertical-align: middle
        &__show
          display: none
          width: 26px
          height: 26px
          border: 2px solid $c-dark
          border-radius: 50%
          position: relative
          .dish-info__figure, .dish-info__figure:before, .dish-info__figure:after
            width: 4px
            height: 4px
            background-color: $c-dark
            border-radius: 50%
            position: absolute
            top: 50%
            left: 50%
            transform: translateY(-50%) translateX(-40%)
          .dish-info__figure:before, .dish-info__figure:after
            content: ''
            display: block
          .dish-info__figure:before
            transform: translateY(-40%) translateX(-8px)
          .dish-info__figure:after
            transform: translateY(-42%) translateX(3px)
          .dish-info__figure_active
            width: 0
          .dish-info__figure_active:before, .dish-info__figure_active:after
            width: 14px
            height: 2px
            border-radius: 0
          .dish-info__figure_active:before
            transform: translateY(-1px) translateX(-7px) rotate(45deg)
          .dish-info__figure_active:after
            transform: translateY(-1px) translateX(-7px) rotate(-45deg)
      &-footer
        display: flex
        justify-content: space-between
        align-items: stretch
        border-top: 2px solid $c-middle
        &__cart
          display: flex
          justify-content: space-between
          align-items: center
          flex-basis: 75%
          padding: 5px 10px
          border-right: 2px solid $c-middle
          &_active
            background-color: $c-active
          .cart
            &-btn
              transition: 0.2s
              &:hover
                transform: scale(1.3)
            &-number
              display: flex
              align-items: center
              &__btn
                width: 24px
                height: 24px
                border: 1px solid $c-dark
                border-radius: 50%
                font-weight: 500
                font-size: 18px
                margin-right: 10px
                transition: 0.2s
                &:last-child
                  margin-right: 0
                &:hover
                  transform: scale(1.4)
              &__value
                width: 20px
                background-color: transparent
                border: none
                font-weight: 500
                font-size: 18px
                text-align: center
                margin-right: 10px
              &_active
                .cart-number__btn
                  border: 1px solid $c-light
                .cart-number__btn, .cart-number__value
                  color: $c-light
        &__favourite
          display: flex
          justify-content: center
          align-items: center
          flex-basis: 25%
          padding: 2px 12px
          box-sizing: border-box
          transition: 0.2s
          &:hover
            transform: scale(1.3)
</style>