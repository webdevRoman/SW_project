<template lang="pug">
.container_center.signup-container
  .logo
    img(src="../assets/img/logo.png", alt="Logo")
  .signup
    .title.signup-title Регистрация
    form.signup-form(action="#", @submit.prevent="checkForm()")
      .form-block.signup-form__block
        label.form-label(for="signup-code") Введите код подтверждения
        input.form-input(type="text", id="signup-code")
      button.form-submit.signup-form__submit(type="submit") Подтвердить
      button.btn.btn_o.signup-form__repeat(@click.prevent="sendCode()") Отправить новый код
</template>

<script>
export default {
  methods: {
    checkForm() {
      this.$store.dispatch('SET_USER_AUTH', true)
      this.$router.push('/')
    },
    sendCode() {
      alert('New code was sent')
    }
  }
}
</script>

<style scoped lang="sass">
@import "../assets/sass/vars"

.signup
  width: 262px
  &-container
    flex-direction: column
    .logo
      margin-bottom: 50px
  &-title
    font-size: 30px
    text-align: center
    margin-bottom: 90px
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
    &__repeat
      width: 100%
      padding: 20px
      margin-top: 20px
</style>