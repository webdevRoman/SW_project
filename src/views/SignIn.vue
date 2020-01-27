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
        button.signin-form__forget(@click.prevent="goToPassword()") Забыли пароль?
        .form-error(v-if="passwordError != ''") {{ passwordError }}
      button.form-submit(type="submit", :disabled="errors") Войти
      button.signin-form__signup(@click.prevent="goToSignup()") Еще нет аккаунта?
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
    goToPassword() {
      this.$store.dispatch('CLEAR_ERRORS', 'all')
      this.$router.push('/password')
    },
    goToSignup() {
      this.$store.dispatch('CLEAR_ERRORS', 'all')
      this.$router.push('/signup')
    },
    checkForm() {
      this.checkEmail()
      this.checkPassword()
      if (!this.errors || (this.email != '' && this.password != '')) {
        this.$store.dispatch('SET_USER_AUTH', true)
        this.$router.push('/')
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
          else {
            this.emailError = ''
            this.$store.dispatch('CLEAR_ERRORS', 'email')
          }
        },
        error => console.log("Email checker rejected: " + error.message)
      )
    },
    checkPassword() {
      this.$store.dispatch('CHECK_OLD_PASSWORD', this.password)
      .then(
        result => {
          if (result == 'empty')
            this.passwordError = 'Заполните пароль'
          else if (result == 'wrong')
            this.passwordError = 'Неверный пароль'
          else {
            this.passwordError = ''
            this.$store.dispatch('CLEAR_ERRORS', 'oldPassword')
          }
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
      font-weight: 500
      font-size: 13px
      color: lighten($c-dark, 40)
      text-transform: uppercase
      text-decoration: underline
      text-align: center
      margin: 30px auto 0 auto
      transition: 0.2s
      &:hover
        color: lighten($c-dark, 20)
</style>