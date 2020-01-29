<template lang="pug">
.header
  .container
    button.user
      .user-img
        img(src="../assets/img/user.svg", alt="User Image")
      .user-name {{ surname }} {{ name }}
      .user-triangle
        img(src="../assets/img/triangle-down.svg", alt="Triangle down")
      .user-menu
        router-link(tag="button", to="/account").user-menu__item Личный кабинет
        router-link(tag="button", to="/admin").user-menu__item Администрирование
        button(@click.prevent="signout()").user-menu__item Выход
</template>

<script>
export default {
  methods: {
    signout() {
      this.$store.dispatch('SET_USER_AUTH', false)
      this.$router.push('/signin')
    }
  },
  computed: {
    name() {
      return this.$store.getters.name
    },
    surname() {
      return this.$store.getters.surname
    }
  }
}
</script>

<style scoped lang="sass">
@import "../assets/sass/vars"

.header
  padding: 9px 0
  background-color: $c-dark
  .container
    display: flex
    justify-content: flex-end
    align-items: center
    .user
      display: flex
      align-items: center
      position: relative
      &-img
        width: 32px
        height: 32px
        padding: 5px
        background-color: $c-bg
        border-radius: 50%
        overflow: hidden
        margin-right: 13px
      &-name
        font-weight: bold
        font-size: $fz-subtitle
        color: $c-light
        transition: 0.2s
        margin-right: 20px
      &:hover
        .user-name
          color: $c-active
      &:focus-within
        .user-menu
          display: block
      &-menu
        display: none
        width: 250px
        box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.25)
        position: absolute
        top: calc(100% + 5px)
        left: 50%
        margin-left: -125px
        z-index: 10
        &__item
          width: 100%
          padding: 14px 24px
          background-color: $c-bg
          font-size: 18px
          text-align-last: left
          transition: 0.2s
          &:hover
            background-color: $c-active
            color: $c-light

@media(max-width: 1200px)
  html
    .header
      .container
        .user
          &-menu
            width: 100%
            left: auto
            right: 0
            margin-left: 0

@media(max-width: 992px)
  html
    .header
      .container
        .user
          &:hover
            .user-name
              color: $c-light
          &-menu
            &__item
              &:hover
                background-color: $c-bg
                color: $c-dark
</style>