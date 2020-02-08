<template lang="pug">
.container_center.password-container
  .logo
    img(src="../assets/img/logo.png", alt="Logo")
  .password
    .title.password-title Замена пароля
    form.form.password-form(action="#", @submit.prevent="checkForm()")
      .form-block(v-if="!isEmailChecked", :class="{'form-block_error': emailError != ''}")
        label.form-label(for="password-email") Корпоративная почта SmartWorld
        input.form-input(type="text", id="password-email", placeholder="@smartworld.team", v-model.trim="email", v-mask="'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'", @focusout="checkEmail()")
        .form-error(v-if="emailError != ''") {{ emailError }}
      .form-block(v-if="isEmailChecked", :class="{'form-block_error': passwordError != ''}")
        label.form-label(for="password-password") Новый пароль
        .form-password
          input.form-input(type="password", id="password-password", v-model.trim="password", @focusout="checkPassword()")
          button.form-password__eye(v-if="!passwordsMatch && passwordFocus && !passwordShow", @click.prevent="togglePasswordShow()")
            img(src="../assets/img/eye.svg", alt="Eye")
          button.form-password__eye(v-if="!passwordsMatch && passwordFocus && passwordShow", @click.prevent="togglePasswordShow()")
            img(src="../assets/img/eye-closed.svg", alt="Closed eye")
          .form-password__eye(v-if="passwordsMatch")
            img(src="../assets/img/tick-success.svg", alt="Tick")
        .form-error(v-if="passwordError != ''") {{ passwordError }}
      .form-block(v-if="isEmailChecked", :class="{'form-block_error': passwordRepeatError != ''}")
        label.form-label(for="password-password-repeat") Повторите новый пароль
        .form-password
          input.form-input(type="password", id="signup-password-repeat", v-model.trim="passwordRepeat", @focusout="checkPasswordRepeat()")
          button.form-password__eye(v-if="!passwordsMatch && passwordRepeatFocus && !passwordRepeatShow", @click.prevent="togglePasswordRepeatShow()")
            img(src="../assets/img/eye.svg", alt="Eye")
          button.form-password__eye(v-if="!passwordsMatch && passwordRepeatFocus && passwordRepeatShow", @click.prevent="togglePasswordRepeatShow()")
            img(src="../assets/img/eye-closed.svg", alt="Closed eye")
          .form-password__eye(v-if="passwordsMatch")
            img(src="../assets/img/tick-success.svg", alt="Tick")
        .form-error(v-if="passwordRepeatError != ''") {{ passwordRepeatError }}
      button.form-submit(type="submit", :disabled="errors") Подтвердить
  .processing-overlay(v-if="processing")
    .processing-indicator
</template>

<script>
export default {
  data() {
    return {
      isEmailChecked: false,
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      passwordFocus: false,
      passwordShow: false,
      passwordRepeat: '',
      passwordRepeatError: '',
      passwordRepeatFocus: false,
      passwordRepeatShow: false,
      passwordsMatch: false
    }
  },
  methods: {
    checkForm() {
      if (!this.isEmailChecked) {
        this.checkEmail()
        if (!this.errors) {
          // dispatch sth, then
          this.isEmailChecked = true
        }
      } else {
        this.checkPassword()
        if (!this.errors) {
          // dispatch sth (send email confirmation), then
          this.$router.push('/password-confirmation')
        }
      }
    },
    checkEmail() {
      const emailArr = this.email.split('@')
      if (this.email != '' && emailArr[1] == undefined)
        this.email = emailArr[0] + '@smartworld.team'
      this.$store.dispatch('CHECK_EMAIL', this.email)
      .then(
        result => {
          if (result == 'empty')
            this.emailError = 'Заполните e-mail'
          else if (result == 'long')
            this.emailError = 'E-mail должен содержать не более 50 символов'
          // else if (result == 'wrong')
          //   this.emailError = 'Невалидный e-mail'
          else {
            this.emailError = ''
            this.$store.dispatch('CLEAR_ERRORS', 'email')
          }
        },
        error => console.log("Email checker rejected: " + error.message)
      )
    },
    checkPassword() {
      this.$store.dispatch('CHECK_PASSWORD', this.password)
      .then(
        result => {
          if (result == 'empty')
            this.passwordError = 'Заполните пароль'
          else if (result == 'short')
            this.passwordError = 'Пароль должен содержать не менее 6 символов'
          else if (result == 'long')
            this.passwordError = 'Пароль должен содержать не более 25 символов'
          else if (result == 'wrong')
            this.passwordError = 'Пароль должен состоять только из латинских букв и цифр'
          else
            this.passwordError = ''
          this.checkPasswordRepeat()
        },
        error => console.log("Password checker rejected: " + error.message)
      )
    },
    checkPasswordRepeat() {
      this.$store.dispatch('CHECK_PASSWORD_REPEAT', { password: this.password, passwordRepeat: this.passwordRepeat })
      .then(
        result => {
          this.passwordsMatch = false
          if (result == 'empty')
            this.passwordRepeatError = 'Заполните пароль'
          else if (result == 'wrong')
            this.passwordRepeatError = 'Пароли не совпадают'
          else if (this.passwordError != '')
            this.passwordRepeatError = ''
          else {
            this.passwordRepeatError = ''
            this.passwordsMatch = true
          }
        },
        error => console.log("PasswordRepeat checker rejected: " + error.message)
      )
    },
    togglePasswordShow() {
      const passwordInput = document.getElementById('password-password')
      if (passwordInput.type == 'password')
        passwordInput.type = 'text'
      else
        passwordInput.type = 'password'
      this.passwordShow = !this.passwordShow
    },
    togglePasswordRepeatShow() {
      const passwordInput = document.getElementById('password-password-repeat')
      if (passwordInput.type == 'password')
        passwordInput.type = 'text'
      else
        passwordInput.type = 'password'
      this.passwordRepeatShow = !this.passwordRepeatShow
    }
  },
  computed: {
    errors() {
      const errors = this.$store.getters.errors
      if (errors.email != undefined && errors.email != 'wrong' || errors.password != undefined || errors.passwordRepeat != undefined)
        return true
      else
        return false
    },
    processing() {
      return this.$store.getters.processing
    }
  },
  watch: {
    password(value) {
      if (value != '')
        this.passwordFocus = true
      else
        this.passwordFocus = false
    },
    passwordRepeat(value) {
      if (value != '')
        this.passwordRepeatFocus = true
      else
        this.passwordRepeatFocus = false
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