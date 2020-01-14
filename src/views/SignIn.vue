<template lang="pug">
.signin-container
  .signin
    .logo Логотип
    .title.signin-title Войти
    form.signin-form(action="#", @submit.prevent="checkForm()")
      .signin-form__block
        label.signin-form__label(for="signin-email") Корпоративная почта SmartWorld
        input.signin-form__input(type="text", id="signin-email")
      .signin-form__block
        label.signin-form__label(for="signin-password") Пароль
        input.signin-form__input(type="password", id="signin-password")
      button.signin-form__btn(type="submit") Вход
</template>

<script>
export default {
  methods: {
    checkForm() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="sass">
@import "../assets/sass/vars"

.signin
  width: 262px
  &-container
    display: flex
    justify-content: center
    align-items: center
    height: 100vh
    width: 100vw
  &-title
    font-size: 30px
    text-align: center
    margin-bottom: 90px
  .logo
    text-align: center
    margin-bottom: 33px
  &-form
    &__block
      margin-bottom: 65px
    &__label
      display: block
      font-weight: 500
      font-size: 13px
      text-transform: uppercase
      color: lighten($c-dark, 40)
      margin-bottom: 5px
      transition: 0.2s
      cursor: pointer
      &:hover
        color: $c-active
    &__input
      width: 100%
      padding: 10px 5px
      border: none
      background-color: transparent
      border-bottom: 2px solid lighten($c-dark, 40)
      font-size: 15px
      transition: 0.2s
      &:focus
        border-bottom: 2px solid $c-active
    &__btn
      width: 100%
      padding: 20px
      background-color: $c-active
      font-weight: 500
      font-size: 18px
      color: $c-light
      transition: 0.2s
      &:hover
        background-color: darken($c-active, 10)
</style>