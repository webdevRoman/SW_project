<template lang="pug">
.container_center
  .signup
    .logo
      img(src="../assets/img/logo.png", alt="Logo")
    .title.signup-title Регистрация
    form.signup-form(action="#", @submit.prevent="checkForm()")
      .signup-form__inputs
        .form-block.signup-form__block
          label.form-label(for="signup-name") Имя
          input.form-input(type="text", id="signup-name")
        .form-block.signup-form__block
          label.form-label(for="signup-surname") Фамилия
          input.form-input(type="text", id="signup-surname")
        .form-block.signup-form__block
          label.form-label(for="signup-patronymic") Отчество (не обязательно)
          input.form-input(type="text", id="signup-patronymic")
        .form-block.signup-form__block
          label.form-label(for="signup-email") Корпоративная почта SmartWorld
          input.form-input(type="text", id="signup-email")
        .form-block.signup-form__block
          label.form-label(for="signup-password") Пароль
          input.form-input(type="password", id="signup-password")
        .form-block.signup-form__block
          label.form-label(for="signup-password-repeat") Повторите пароль
          input.form-input(type="password", id="signup-password-repeat")
      button.form-submit.signup-form__submit(type="submit") Зарегистрироваться
      router-link.signup-form__signin(to="/signin") Уже есть аккаунт?
</template>

<script>
export default {
  methods: {
    checkForm() {
      this.$router.push('/email-confirmation')
    }
  }
}
</script>

<style scoped lang="sass">
@import "../assets/sass/vars"

.signup
  width: 945px
  &-title
    font-size: 30px
    text-align: center
    margin-bottom: 90px
  .logo
    margin-bottom: 50px
  &-form
    &__inputs
      display: flex
      justify-content: space-between
      align-items: center
      flex-wrap: wrap
    &__block
      flex-basis: 262px
      margin-right: 78px
      &:nth-child(3n)
        margin-right: 0
    &__submit
      display: block
      width: 262px
      margin: 0 auto
    &__signin
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