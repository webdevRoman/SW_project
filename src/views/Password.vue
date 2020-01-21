<template lang="pug">
.container_center.password-container
  .logo
    img(src="../assets/img/logo.png", alt="Logo")
  .password
    .title.password-title Замена пароля
    form.password-form(action="#", @submit.prevent="checkForm()")
      .form-block(v-if="!isEmailChecked")
        label.form-label(for="password-email") Корпоративная почта SmartWorld
        input.form-input(type="text", id="password-email")
      .form-block(v-if="isEmailChecked")
        label.form-label(for="password-password") Новый пароль
        input.form-input(type="password", id="password-password")
      .form-block(v-if="isEmailChecked")
        label.form-label(for="password-password-repeat") Повторите новый пароль
        input.form-input(type="password", id="password-password-repeat")
      button.form-submit(type="submit") Подтвердить
</template>

<script>
export default {
  data() {
    return {
      isEmailChecked: false
    }
  },
  methods: {
    checkForm() {
      if (!this.isEmailChecked) {
        this.isEmailChecked = true
      } else {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped lang="sass">
@import "../assets/sass/vars"

.password
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
</style>