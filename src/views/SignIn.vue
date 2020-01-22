<template lang="pug">
.container_center.signin-container
  .logo
    img(src="../assets/img/logo.png", alt="Logo")
  .signin
    .title.signin-title Вход
    form.signin-form(action="#", @submit.prevent="checkForm()")
      .form-block
        label.form-label(for="signin-email") Корпоративная почта SmartWorld
        input.form-input(type="text", id="signin-email", placeholder="@smartworld.team", v-model="email", @focusout="checkEmail()")
        .form-error(v-if="emailError != ''") {{ emailError }}
      .form-block
        label.form-label(for="signin-password") Пароль
        .form-password
          input.form-input(type="password", id="signin-password", v-model="password", @focusout="checkPassword()")
          button.form-password__eye(v-if="passwordFocus && !passwordShow", @click.prevent="togglePasswordShow()")
            img(src="../assets/img/eye.svg", alt="Eye")
          button.form-password__eye(v-if="passwordFocus && passwordShow", @click.prevent="togglePasswordShow()")
            img(src="../assets/img/eye-closed.svg", alt="Closed eye")
        router-link.signin-form__forget(to="/password") Забыли пароль?
        .form-error(v-if="passwordError != ''") {{ passwordError }}
      button.form-submit(type="submit", :disabled="errors") Войти
      router-link.signin-form__signup(to="/signup") Еще нет аккаунта?
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
      passwordShow: false
    }
  },
  methods: {
    checkForm() {
      if (!this.errors)
        this.$router.push('/')
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
      const passwordInput = document.getElementById('signin-password')
      if (passwordInput.type == 'password')
        passwordInput.type = 'text'
      else
        passwordInput.type = 'password'
      this.passwordShow = !this.passwordShow
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
    }
  }
}
</script>

<style scoped lang="sass">
@import "../assets/sass/vars"

.signin
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