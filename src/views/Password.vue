<template lang="pug">
.container_center.password-container
  .logo
    img(src="../assets/img/logo.png", alt="Logo")
  .password
    .title.password-title Замена пароля
    form.password-form(action="#", @submit.prevent="checkForm()")
      .form-block(v-if="!isEmailChecked")
        label.form-label(for="password-email") Корпоративная почта SmartWorld
        input.form-input(type="text", id="password-email", placeholder="@smartworld.team", v-model.trim="email")
      .form-block(v-if="isEmailChecked")
        label.form-label(for="password-password") Новый пароль
        input.form-input(type="password", id="password-password", v-model.trim="password")
      .form-block(v-if="isEmailChecked")
        label.form-label(for="password-password-repeat") Повторите новый пароль
        input.form-input(type="password", id="password-password-repeat", v-model.trim="passwordRepeat")
      button.form-submit(type="submit") Подтвердить
</template>

<script>
export default {
  data() {
    return {
      isEmailChecked: false,
      email: '',
      password: '',
      passwordRepeat: ''
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
        
@media(max-width: 1200px)
  html
    .container_center
      align-items: center
      height: 100vh
    .password
      &-title
        font-size: 28px
        margin-bottom: 60px
      .logo
        margin-bottom: 25px

@media(max-width: 768px)
  html
    .container_center
      background: url("../assets/img/bg.png") $c-bg center center no-repeat
      background-size: cover
    .password
      &-title
        font-size: 20px
        margin-bottom: 50px
      .form
        &-block
          margin-right: 0
          &:nth-child(3n)
            margin-right: 0
          &:nth-child(2n)
            margin-right: 0
        &-submit
          width: 100%
          margin-top: 60px

@media(max-width: 576px)
  html
    .password
      width: 200px
      &-title
        font-size: 15px
        margin-bottom: 25px
      .logo
        margin-bottom: 20px
      .form
        &-block
          margin-right: 0
          &:nth-child(3n)
            margin-right: 0
          &:nth-child(2n)
            margin-right: 0
        &-submit
          width: 210px
          font-size: 15px
          margin-top: 60px
</style>