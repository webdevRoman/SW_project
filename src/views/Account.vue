<template lang="pug">
.container_center
  .account
    .account-logo
      .account-logo__line
      .account-logo__img
        img(src="../assets/img/user.svg", alt="User icon")
    form.account-form(action="#", @submit.prevent="checkForm()")
      .account-form__inputs
        .form-block.account-form__block
          label.form-label(for="account-name") Имя
          input.form-input(type="text", id="account-name", v-model="changingName")
        .form-block.account-form__block
          label.form-label(for="account-surname") Фамилия
          input.form-input(type="text", id="account-surname", v-model="changingSurname")
        .form-block.account-form__block
          label.form-label(for="account-middlename") Отчество (не обязательно)
          input.form-input(type="text", id="account-middlename", v-model="changingMiddlename")
        .form-block.account-form__block
          label.form-label(for="account-password-old") Ваш действующий пароль
          input.form-input(type="password", id="account-password-old")
        .form-block.account-form__block
          label.form-label(for="account-password") Новый пароль
          input.form-input(type="password", id="account-password")
        .form-block.account-form__block
          label.form-label(for="account-password-repeat") Повторите пароль
          input.form-input(type="password", id="account-password-repeat")
        .form-block.account-form__block.account-form__block__checkbox
          input.form-input.account-form__checkbox(type="checkbox", id="account-checkbox", @change="toggleCalendar()")
          label.form-label(for="account-checkbox") Не заказывать на меня
        .form-block.account-form__block.account-form__block__calendar
          label.form-label(@click.prevent="showCalendar()") Начало и окончание периода отмены
          input.form-input(type="text", id="account-date-start", v-mask="'##.##.####'", v-model="inputsDates.start", @focus="showCalendar()", @change="checkInputs()")
          .account-form__separator
          input.form-input(type="text", id="account-date-end", v-mask="'##.##.####'", v-model="inputsDates.end", @focus="showCalendar()", @change="checkInputs()")
          FunctionalCalendar.calendar.account-form__calendar(v-model="calendarDates", :configs="calendarConfig")
      .account-form__buttons
        router-link.btn.btn_o.account-form__btn(tag="button", to="/") Вернуться на сайт
        button.form-submit.account-form__btn.account-form__submit(type="submit") Подтвердить
</template>

<script>
export default {
  data() {
    return {
      changingName: '',
      changingSurname: '',
      changingMiddlename: '',
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
      isChoosingDate: false
    }
  },
  methods: {
    checkForm() {
      // this.$store.dispatch('LOAD_DATA', 'http://demo7404292.mockable.io/')
      // .then(
      //   result => console.log(result),
      //   error => console.log('error: ' + error)
      // )
      // .catch(error => console.log(error))
      // this.$router.push('/')
    },
    getTodayDate() {
      const date = new Date()
      return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
    },
    showCalendar() {
      const checkbox = document.querySelector('.account-form__checkbox')
      const calendar = document.querySelector('.account-form__calendar')
      checkbox.checked = true
      calendar.classList.add('account-form__calendar_active')
      this.isChoosingDate = true
      this.hideCalendar()
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
          self.isChoosingDate = false
          document.removeEventListener('click', hideOnClickOutside)
        }
      }
      document.addEventListener('click', hideOnClickOutside)
    },
    toggleCalendar() {
      const calendar = document.querySelector('.account-form__calendar')
      const checkbox = document.querySelector('.account-form__checkbox')
      const startInput = document.getElementById('account-date-start')
      if (checkbox.checked) {
        startInput.focus()
        const date = new Date()
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
        // this.calendarDates.dateRange.start.date = dateStr
        // this.calendarDates.dateRange.end.date = dateStr
        this.inputsDates.start = this.formatDateInputs(dateStr)
        this.inputsDates.end = this.formatDateInputs(dateStr)
        this.isChoosingDate = true
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
        // this.calendarDates.dateRange.start.date = ''
        // this.calendarDates.dateRange.end.date = ''
        this.inputsDates.start = ''
        this.inputsDates.end = ''
        calendar.classList.remove('account-form__calendar_active')
        this.isChoosingDate = false
      }
    },
    checkInputs() {
      const startInput = document.getElementById('account-date-start')
      const endInput = document.getElementById('account-date-end')
      if (startInput.value.length == 10)
        this.calendarDates.dateRange.start.date = this.formatDateCalendar(startInput.value)
      else
        this.calendarDates.dateRange.start.date = false
      if (endInput.value.length == 10)
        this.calendarDates.dateRange.end.date = this.formatDateCalendar(endInput.value)
      else
        this.calendarDates.dateRange.end.date = false

      if (startInput.value.length == 10 && endInput.value.length == 10) {
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
    name() {
      return this.$store.getters.name
    },
    surname() {
      return this.$store.getters.surname
    },
    middlename() {
      return this.$store.getters.middlename
    }
  },
  watch: {
    isChoosingDate(value) {
      const checkbox = document.querySelector('.account-form__checkbox')
      if (!value && (this.calendarDates.dateRange.start.date == false || this.calendarDates.dateRange.end.date == false)) {
        checkbox.checked = false
      } else {
        checkbox.checked = true
      }
    },
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
    this.changingName = this.name
    this.changingSurname = this.surname
    this.changingMiddlename = this.middlename
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
      align-items: center
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
</style>