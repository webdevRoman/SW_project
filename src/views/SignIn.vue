<template lang="pug">
.container_center
  .signin
    .logo Логотип
    .title.signin-title Вход
    form.signin-form(action="#", @submit.prevent="checkForm()")
      .form-block
        label.form-label(for="signin-email") Корпоративная почта SmartWorld
        input.form-input(type="text", id="signin-email")
      .form-block
        label.form-label(for="signin-password") Пароль
        input.form-input(type="password", id="signin-password")
        router-link.signin-form__forget(to="/password") Забыли пароль?
      button.form-submit(type="submit") Войти
      router-link.signin-form__signup(to="/signup") Еще нет аккаунта?
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
  &-title
    font-size: 30px
    text-align: center
    margin-bottom: 90px
  .logo
    text-align: center
    margin-bottom: 33px
  &-form
    &__forget
      display: block
      font-weight: 500
      font-size: 13px
      color: lighten($c-dark, 40)
      text-decoration: underline
      margin-top: 12px
      transition: 0.2s
      &:hover
        color: lighten($c-dark, 20)
    &__signup
      display: block
      font-weight: 500
      font-size: 13px
      color: lighten($c-dark, 40)
      text-transform: uppercase
      text-decoration: underline
      text-align: center
      margin-top: 30px
      transition: 0.2s
      &:hover
        color: lighten($c-dark, 20)
</style>