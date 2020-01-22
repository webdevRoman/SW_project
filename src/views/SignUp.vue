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
          input.form-input(type="text", id="signup-email", placeholder="@smartworld.team", v-model="email", @focusout="checkEmail()")
          .form-error(v-if="emailError != ''") {{ emailError }}
        .form-block.signup-form__block
          label.form-label(for="signup-password") Пароль
          .form-password
            input.form-input(type="password", id="signup-password", v-model="password", @focusout="checkPassword()")
            button.form-password__eye(v-if="!passwordsMatch && passwordFocus && !passwordShow", @click.prevent="togglePasswordShow()")
              img(src="../assets/img/eye.svg", alt="Eye")
            button.form-password__eye(v-if="!passwordsMatch && passwordFocus && passwordShow", @click.prevent="togglePasswordShow()")
              img(src="../assets/img/eye-closed.svg", alt="Closed eye")
            .form-password__eye(v-if="passwordsMatch")
              img(src="../assets/img/tick-success.svg", alt="Tick")
          .form-error(v-if="passwordError != ''") {{ passwordError }}
        .form-block.signup-form__block
          label.form-label(for="signup-password-repeat") Повторите пароль
          .form-password
            input.form-input(type="password", id="signup-password-repeat", v-model="passwordRepeat", @focusout="checkPasswordRepeat()")
            button.form-password__eye(v-if="!passwordsMatch && passwordRepeatFocus && !passwordRepeatShow", @click.prevent="togglePasswordRepeatShow()")
              img(src="../assets/img/eye.svg", alt="Eye")
            button.form-password__eye(v-if="!passwordsMatch && passwordRepeatFocus && passwordRepeatShow", @click.prevent="togglePasswordRepeatShow()")
              img(src="../assets/img/eye-closed.svg", alt="Closed eye")
            .form-password__eye(v-if="passwordsMatch")
              img(src="../assets/img/tick-success.svg", alt="Tick")
          .form-error(v-if="passwordRepeatError != ''") {{ passwordRepeatError }}
      button.form-submit.signup-form__submit(type="submit", :disabled="errors") Зарегистрироваться
      router-link.signup-form__signin(to="/signin") Уже есть аккаунт?
</template>

<script>
export default {
  data() {
    return {
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
      this.checkEmail()
      this.checkPassword()
      this.checkPasswordRepeat()
      if (!this.errors)
        this.$router.push('/email-confirmation')
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
          else if (result == 'wrong')
            this.emailError = 'Невалидный e-mail'
          else
            this.emailError = ''
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
        },
        error => console.log("Password checker rejected: " + error.message)
      )
    },
    togglePasswordShow() {
      const passwordInput = document.getElementById('signup-password')
      if (passwordInput.type == 'password')
        passwordInput.type = 'text'
      else
        passwordInput.type = 'password'
      this.passwordShow = !this.passwordShow
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
          else {
            this.passwordRepeatError = ''
            this.passwordsMatch = true
          }
        },
        error => console.log("PasswordRepeat checker rejected: " + error.message)
      )
    },
    togglePasswordRepeatShow() {
      const passwordInput = document.getElementById('signup-password-repeat')
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
      if (errors.email != undefined || errors.password != undefined)
        return true
      else
        return false
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