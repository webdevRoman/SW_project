<template lang="pug">
.container_center
  .account
    .account-logo
      .account-logo__line
      .account-logo__img
        img(src="../assets/img/user.svg", alt="User icon")
    form.form.account-form(action="#", @submit.prevent="checkForm()")
      .account-form__inputs
        .form-block.account-form__block(:class="{'form-block_error': nameError != ''}")
          label.form-label(for="account-name") Имя
          input.form-input(type="text", id="account-name", v-model.trim="name", v-mask="'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'", @focusout="checkName()")
          .form-error(v-if="nameError != ''") {{ nameError }}
        .form-block.account-form__block(:class="{'form-block_error': surnameError != ''}")
          label.form-label(for="account-surname") Фамилия
          input.form-input(type="text", id="account-surname", v-model.trim="surname", v-mask="'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'", @focusout="checkSurname()")
          .form-error(v-if="surnameError != ''") {{ surnameError }}
        .form-block.account-form__block(:class="{'form-block_error': middlenameError != ''}")
          label.form-label(for="account-middlename") Отчество (не обязательно)
          input.form-input(type="text", id="account-middlename", v-model.trim="middlename", v-mask="'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'", @focusout="checkMiddlename()")
          .form-error(v-if="middlenameError != ''") {{ middlenameError }}
        .form-block.account-form__block(:class="{'form-block_error': oldPasswordError != ''}")
          label.form-label(for="account-password-old") Ваш действующий пароль
          .form-password
            input.form-input(type="password", id="account-password-old", v-model.trim="oldPassword", @focusout="checkOldPassword()")
            button.form-password__eye(v-if="oldPasswordFocus && !oldPasswordShow", @click.prevent="togglePasswordShow('account-password-old')")
              img(src="../assets/img/eye.svg", alt="Eye")
            button.form-password__eye(v-if="oldPasswordFocus && oldPasswordShow", @click.prevent="togglePasswordShow('account-password-old')")
              img(src="../assets/img/eye-closed.svg", alt="Closed eye")
          .form-error(v-if="oldPasswordError != ''") {{ oldPasswordError }}
        .form-block.account-form__block(:class="{'form-block_disabled': !newPasswordEnabled, 'form-block_error': passwordError != ''}")
          label.form-label(for="account-password") Новый пароль
          .form-password
            input.form-input(type="password", id="account-password", v-model.trim="password", @focusout="checkPassword()", :disabled="!newPasswordEnabled")
            button.form-password__eye(v-if="!passwordsMatch && passwordFocus && !passwordShow", @click.prevent="togglePasswordShow('account-password')")
              img(src="../assets/img/eye.svg", alt="Eye")
            button.form-password__eye(v-if="!passwordsMatch && passwordFocus && passwordShow", @click.prevent="togglePasswordShow('account-password')")
              img(src="../assets/img/eye-closed.svg", alt="Closed eye")
            .form-password__eye(v-if="passwordsMatch")
              img(src="../assets/img/tick-success.svg", alt="Tick")
          .form-error(v-if="passwordError != ''") {{ passwordError }}
        .form-block.account-form__block(:class="{'form-block_disabled': !newPasswordEnabled, 'form-block_error': passwordRepeatError != ''}")
          label.form-label(for="account-password-repeat") Повторите пароль
          .form-password
            input.form-input(type="password", id="account-password-repeat", v-model.trim="passwordRepeat", @focusout="checkPasswordRepeat()", :disabled="!newPasswordEnabled")
            button.form-password__eye(v-if="!passwordsMatch && passwordRepeatFocus && !passwordRepeatShow", @click.prevent="togglePasswordShow('account-password-repeat')")
              img(src="../assets/img/eye.svg", alt="Eye")
            button.form-password__eye(v-if="!passwordsMatch && passwordRepeatFocus && passwordRepeatShow", @click.prevent="togglePasswordShow('account-password-repeat')")
              img(src="../assets/img/eye-closed.svg", alt="Closed eye")
            .form-password__eye(v-if="passwordsMatch")
              img(src="../assets/img/tick-success.svg", alt="Tick")
          .form-error(v-if="passwordRepeatError != ''") {{ passwordRepeatError }}
        .form-block.account-form__block.account-form__block__checkbox
          input.form-input.account-form__checkbox(type="checkbox", id="account-checkbox", v-model="calendarCheckbox", @change="toggleCalendar()")
          label.form-label(for="account-checkbox") Не заказывать на меня
        .form-block.account-form__block.account-form__block__calendar(:class="{'form-block_disabled': !calendarCheckbox, 'form-block_error': calendarError != ''}")
          label.form-label(@click.prevent="showCalendar()") Начало и окончание периода отмены
          input.form-input(type="text", id="account-date-start", v-mask="'##.##.####'", v-model.trim="inputsDates.start", @focus="showCalendar()", @focusout="checkInputs()", :disabled="!calendarCheckbox")
          .account-form__separator
          input.form-input(type="text", id="account-date-end", v-mask="'##.##.####'", v-model.trim="inputsDates.end", @focus="showCalendar()", @focusout="checkInputs()", :disabled="!calendarCheckbox")
          FunctionalCalendar.calendar.account-form__calendar(v-model="calendarDates", :configs="calendarConfig")
          .form-error(v-if="calendarError != ''") {{ calendarError }}
      .account-form__buttons
        button.btn.btn_o.account-form__btn(@click.prevent="goBack()") Вернуться на сайт
        button.form-submit.account-form__btn.account-form__submit(type="submit", :disabled="errors") Подтвердить
</template>

<script>
export default {
  data() {
    return {
      name: '',
      nameError: '',
      surname: '',
      surnameError: '',
      middlename: '',
      middlenameError: '',
      email: '',
      emailError: '',
      oldPassword: '',
      oldPasswordError: '',
      oldPasswordFocus: false,
      oldPasswordShow: false,
      password: '',
      passwordError: '',
      passwordFocus: false,
      passwordShow: false,
      passwordRepeat: '',
      passwordRepeatError: '',
      passwordRepeatFocus: false,
      passwordRepeatShow: false,
      passwordsMatch: false,
      calendarCheckbox: false,
      calendarError: '',
      newPasswordEnabled: false,
      calendarConfig: {
        isDateRange: true,
        dateFormat: 'dd.mm.yyyy',
        disabledDayNames: ['Вс'],
        disabledDates: ['beforeToday'],
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        shortMonthNames: ['Янв', 'Февр', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек'],
        limits: { min: this.getTodayDate(), max: '31.12.3030' },
        applyStylesheet: false
      },
      calendarDates: {
        dateRange: {
          start: {
            date: false
          },
          end: {
            date: false
          }
        }
      },
      inputsDates: {
        start: '',
        end: ''
      },
      // isChoosingDate: false
    }
  },
  methods: {
    goBack() {
      this.$store.dispatch('CLEAR_ERRORS', 'all')
      this.$router.push('/')
    },
    checkForm() {
      this.checkName()
      this.checkSurname()
      this.checkMiddlename()
      this.checkOldPassword()
      if (!this.errors)
        this.$router.push('/')
    },
    checkName() {
      this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase()
      this.$store.dispatch('CHECK_NAME', { type: 'name', data: this.name })
      .then(
        result => {
          if (result == 'empty')
            this.nameError = 'Заполните имя'
          else if (result == 'long')
            this.nameError = 'Имя должно содержать не более 35 символов'
          else if (result == 'wrong')
            this.nameError = 'Имя должно состоять только из букв русского алфавита'
          else
            this.nameError = ''
        },
        error => console.log("Name checker rejected: " + error.message)
      )
    },
    checkSurname() {
      this.surname = this.surname.charAt(0).toUpperCase() + this.surname.slice(1).toLowerCase()
      this.$store.dispatch('CHECK_NAME', { type: 'surname', data: this.surname })
      .then(
        result => {
          if (result == 'empty')
            this.surnameError = 'Заполните фамилию'
          else if (result == 'long')
            this.surnameError = 'Фамилия должна содержать не более 35 символов'
          else if (result == 'wrong')
            this.surnameError = 'Фамилия должна состоять только из букв русского алфавита'
          else
            this.surnameError = ''
        },
        error => console.log("Name checker rejected: " + error.message)
      )
    },
    checkMiddlename() {
      this.middlename = this.middlename.charAt(0).toUpperCase() + this.middlename.slice(1).toLowerCase()
      this.$store.dispatch('CHECK_NAME', { type: 'middlename', data: this.middlename })
      .then(
        result => {
          if (result == 'long')
            this.middlenameError = 'Отчество должно содержать не более 35 символов'
          else if (result == 'wrong')
            this.middlenameError = 'Отчество должно состоять только из букв русского алфавита'
          else
            this.middlenameError = ''
        },
        error => console.log("Name checker rejected: " + error.message)
      )
    },
    checkOldPassword() {
      if (this.oldPassword == '') {
        this.$store.dispatch('CLEAR_ERRORS', 'oldPassword')
        this.$store.dispatch('CLEAR_ERRORS', 'password')
        this.passwordError = ''
        this.$store.dispatch('CLEAR_ERRORS', 'passwordRepeat')
        this.passwordRepeatError = ''
      } else {
        this.$store.dispatch('CHECK_OLD_PASSWORD', this.oldPassword)
        .then(
          result => {
            if (result == 'wrong')
              this.oldPasswordError = 'Неверный пароль'
            else {
              this.oldPasswordError = ''
              this.$store.dispatch('CLEAR_ERRORS', 'oldPassword')
              this.checkPassword()
              this.checkPasswordRepeat()
            }
          },
          error => console.log("OldPassword checker rejected: " + error.message)
        )
      }
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
    togglePasswordShow(id) {
      const passwordInput = document.getElementById(id)
      if (passwordInput.type == 'password')
        passwordInput.type = 'text'
      else
        passwordInput.type = 'password'
      if (id == 'account-password-old')
        this.oldPasswordShow = !this.oldPasswordShow
      else if (id == 'account-password')
        this.passwordShow = !this.passwordShow
      else if (id == 'account-password-repeat')
        this.passwordRepeatShow = !this.passwordRepeatShow
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
    getTodayDate() {
      const date = new Date()
      return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
    },
    showCalendar() {
      if (this.calendarCheckbox) {
        // const checkbox = document.querySelector('.account-form__checkbox')
        const calendar = document.querySelector('.account-form__calendar')
        // checkbox.checked = true
        calendar.classList.add('account-form__calendar_active')
        // this.isChoosingDate = true
        this.hideCalendar()
      }
    },
    hideCalendar() {
      const calendar = document.querySelector('.account-form__calendar')
      const self = this
      function hideOnClickOutside(e) {
        let a = e.target
        let parentsFlag = false
        while (a) {
          if (a == calendar) {
            parentsFlag = true
            break
          }
          a = a.parentNode
        }
        if(calendar.classList.contains('account-form__calendar_active') && !parentsFlag && !e.target.parentNode.classList.contains('account-form__block__calendar') && !e.target.classList.contains('account-form__block__calendar')) {
          calendar.classList.remove('account-form__calendar_active')
          // self.isChoosingDate = false
          self.checkInputs()
          document.removeEventListener('click', hideOnClickOutside)
        }
      }
      document.addEventListener('click', hideOnClickOutside)
    },
    toggleCalendar() {
      const calendar = document.querySelector('.account-form__calendar')
      // const checkbox = document.querySelector('.account-form__checkbox')
      const startInput = document.getElementById('account-date-start')
      // if (checkbox.checked) {
      if (this.calendarCheckbox) {
        this.showCalendar()
        startInput.focus()
        const date = new Date()
        date.setDate(date.getDate() + 1)
        let dateStr = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
        this.calendarDates = {
          dateRange: {
            start: {
              date: dateStr
            },
            end: {
              date: dateStr
            }
          }
        }
        this.inputsDates.start = this.formatDateInputs(dateStr)
        this.inputsDates.end = this.formatDateInputs(dateStr)
        // this.isChoosingDate = true
      } else {
        this.calendarDates = {
          dateRange: {
            start: {
              date: false
            },
            end: {
              date: false
            }
          }
        }
        this.inputsDates.start = ''
        this.inputsDates.end = ''
        this.$store.dispatch('CLEAR_ERRORS', 'dates')
        this.calendarError = ''
        calendar.classList.remove('account-form__calendar_active')
        // this.isChoosingDate = false
      }
    },
    checkInputs() {
      const startInput = document.getElementById('account-date-start')
      const endInput = document.getElementById('account-date-end')
      if (startInput.value.length == 10) {
        this.calendarDates.dateRange.start.date = this.formatDateCalendar(startInput.value)
      } else {
        this.calendarDates.dateRange.start.date = false
        this.$store.dispatch('SET_ERROR', { type: 'dates', msg: 'wrong' })
        this.calendarError = 'Дни отмены заказа не выбраны'
      }
      if (endInput.value.length == 10) {
        this.calendarDates.dateRange.end.date = this.formatDateCalendar(endInput.value)
      } else {
        this.calendarDates.dateRange.end.date = false
        this.$store.dispatch('SET_ERROR', { type: 'dates', msg: 'wrong' })
        this.calendarError = 'Дни отмены заказа не выбраны'
      }

      if (startInput.value.length == 10 && endInput.value.length == 10) {
        this.$store.dispatch('CLEAR_ERRORS', 'dates')
        this.calendarError = ''
        const startDateArr = startInput.value.split('.')
        const endDateArr = endInput.value.split('.')
        if (parseInt(startDateArr[2]) > parseInt(endDateArr[2])) {
          let temp = startInput.value
          startInput.value = endInput.value
          endInput.value = temp
          this.swapDates()
        } else if (parseInt(startDateArr[1]) > parseInt(endDateArr[1])) {
          let temp = startInput.value
          startInput.value = endInput.value
          endInput.value = temp
          this.swapDates()
        } else if (parseInt(startDateArr[0]) > parseInt(endDateArr[0])) {
          let temp = startInput.value
          startInput.value = endInput.value
          endInput.value = temp
          this.swapDates()
        }
      }
    },
    swapDates() {
      const inputsTemp = this.inputsDates.start
      this.inputsDates.start = this.inputsDates.end
      this.inputsDates.end = inputsTemp
      const calendarTemp = this.calendarDates.dateRange.start.date
      this.calendarDates.dateRange.start.date = this.calendarDates.dateRange.end.date
      this.calendarDates.dateRange.end.date = calendarTemp
    },
    formatDateInputs(dateStr) {
      let dateArr = dateStr.split('.')
      if (dateArr[0].length < 2)
        dateArr[0] = '0' + dateArr[0]
      if (dateArr[1].length < 2)
        dateArr[1] = '0' + dateArr[1]
      return dateArr.join('.')
    },
    formatDateCalendar(dateStr) {
      let dateArr = dateStr.split('.')
      if (dateArr[0].length == 2 && dateArr[0][0] == '0')
        dateArr[0] = dateArr[0][1]
      if (dateArr[1].length == 2 && dateArr[1][0] == '0')
        dateArr[1] = dateArr[1][1]
      return dateArr.join('.')
    }
  },
  computed: {
    oldName() {
      return this.$store.getters.name
    },
    oldSurname() {
      return this.$store.getters.surname
    },
    oldMiddlename() {
      return this.$store.getters.middlename
    },
    errors() {
      const errors = this.$store.getters.errors
      if (errors.oldPassword != undefined || errors.password != undefined || errors.passwordRepeat != undefined || errors.name != undefined || errors.surname != undefined || errors.middlename != undefined || errors.dates != undefined)
        return true
      else
        return false
    }
  },
  watch: {
    oldPassword(value) {
      if (value != '') {
        this.oldPasswordFocus = true
        this.newPasswordEnabled = true
      } else {
        this.oldPasswordFocus = false
        this.newPasswordEnabled = false
      }
    },
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
    },
    // calendarCheckbox(value) {
    //   console.log(value)
    // },
    // isChoosingDate(value) {
    //   const checkbox = document.querySelector('.account-form__checkbox')
    //   if (!value && (this.calendarDates.dateRange.start.date == false || this.calendarDates.dateRange.end.date == false)) {
    //     checkbox.checked = false
    //   } else {
    //     checkbox.checked = true
    //   }
    // },
    calendarDates: {
      handler (value) {
        value = {
          dateRange: {
            start: {
              date: value.dateRange.start.date
            },
            end: {
              date: value.dateRange.end.date
            }
          }
        }
        if (value.dateRange.start.date == false)
          this.inputsDates.start = ''
        else
          this.inputsDates.start = this.formatDateInputs(value.dateRange.start.date)
        if (value.dateRange.end.date == false)
          this.inputsDates.end = ''
        else
          this.inputsDates.end = this.formatDateInputs(value.dateRange.end.date)
      },
      deep: true
    },
  },
  created() {
    this.name = this.oldName
    this.surname = this.oldSurname
    this.changingMiddlename = this.oldMiddlename
  }
}
</script>

<style scoped lang="sass">
@import "../assets/sass/vars"

.container_center
  overflow-x: hidden
.account
  width: 945px
  &-logo
    margin: 0 auto 90px auto
    position: relative
    &__line
      width: 274px
      height: 3px
      background-color: $c-dark
      position: absolute
      top: 70px
      left: 50%
      margin-left: -137px
      z-index: -1
    &__img
      display: flex
      justify-content: center
      align-items: center
      width: 110px
      height: 110px
      padding: 27px
      border-radius: 50%
      border: 2px solid $c-dark
      background-color: $c-bg
      margin: 0 auto
  &-form
    &__inputs
      display: flex
      justify-content: space-between
      flex-wrap: wrap
      margin-bottom: 50px
      &:after
        content: ''
        flex: auto
    &__block
      flex-basis: 262px
      margin-right: 78px
      margin-bottom: 50px
      &:nth-child(3n)
        margin-right: 0
      &__checkbox
        .form-label
          font-weight: 500
          font-size: 13px
          color: $c-dark
      &__calendar
        display: flex
        align-items: center
        flex-wrap: wrap
        flex-basis: 275px
        position: relative
        .form-label
          flex-basis: 100%
        .form-input
          flex-basis: 97px
    &__checkbox
      max-width: 262px
    &__separator
      width: 21px
      height: 2px
      background-color: $c-dark
      margin: 0 23px
    &__calendar
      display: none
      position: absolute
      top: calc(100% + 15px)
      left: 50%
      margin-left: -154px
      margin-bottom: 25px
      &_active
        display: block
    &__buttons
      display: flex
      justify-content: center
      align-items: center
    &__btn
      display: block
      width: 262px
      padding: 20px
      font-weight: 500
      font-size: 18px
      &:first-child
        margin-right: 30px

.account-form__checkbox
  position: absolute
  z-index: -1
  opacity: 0
.account-form__checkbox + label
  position: relative
  padding: 0 0 0 40px
  cursor: pointer
.account-form__checkbox + label:before
  content: ''
  position: absolute
  top: 50%
  left: 0
  margin-top: -15px
  width: 24px
  height: 24px
  border: 2px solid #2c3e50
  background: transparent
  transition: 0.1s
.account-form__checkbox + label:after
  content: ''
  position: absolute
  top: 50%
  left: 4px
  width: 20px
  height: 20px
  margin-top: -11px
  background: url(../assets/img/tick.svg) center no-repeat
  background-size: contain
  opacity: 0
  transition: 0.1s
.account-form__checkbox:checked + label:after
  opacity: 1

@media(max-width: 1200px)
  html
    .container_center
      overflow-x: visible
    .account
      width: 610px
      &-logo
        margin-bottom: 25px
        &__line
          width: 186px
          height: 2px
          top: 50px
          margin-left: -93px
        &__img
          width: 75px
          height: 75px
          padding: 17px
      &-form
        &__block
          margin-right: 85px
          &:nth-child(3n)
            margin-right: 85px
          &:nth-child(2n)
            margin-right: 0
        .account-form__block__calendar
          margin-right: -13px
        &__btn
          width: 210px
          &:first-child
            margin-right: 25px

@media(max-width: 768px)
  html
    .account
      width: 380px
      &-logo
        margin-bottom: 65px
      &-form
        &__inputs
          margin-bottom: 65px
          &:after
            display: none
        &__block
          margin: 0 auto 30px auto
          &:nth-child(3n)
            margin-right: auto
          &:nth-child(2n)
            margin-right: auto
          &__checkbox
            margin-top: 10px
        &__btn
          width: 180px
          padding: 15px
          font-size: 15px
          &:first-child
            margin-right: 20px

@media(max-width: 576px)
  html
    .account
      width: 200px
      &-logo
        margin-bottom: 40px
        &__line
          width: 138px
          height: 1px
          top: 35px
          margin-left: -69px
        &__img
          width: 54px
          height: 54px
          padding: 13px
          border: 1px solid $c-dark
      &-form
        &__inputs
          margin-bottom: 50px
        &__block
          margin-bottom: 20px
          &__checkbox
            .form-label
              font-size: 12px
        .account-form__block__calendar
          flex-basis: 210px
          margin-right: -10px
          .form-input
            flex-basis: 72px
            font-size: 14px
        &__checkbox
          max-width: 200px
        &__separator
          width: 15px
          margin: 0 20px
        &__calendar
          margin-left: -133px
        &__buttons
          flex-direction: column-reverse
        &__btn
          width: 160px
          font-size: 13px
          &:first-child
            margin-right: 0
            margin-top: 15px
    .account-form__checkbox + label
      padding: 0 0 0 30px
    .account-form__checkbox + label:before
      margin-top: -10px
      width: 18px
      height: 18px
      border: 1px solid #2c3e50
    .account-form__checkbox + label:after
      top: 50%
      left: 3px
      width: 14px
      height: 14px
      margin-top: -6px
</style>