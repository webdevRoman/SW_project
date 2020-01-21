<template lang="pug">
.weekdays
  .container
    button.weekday(v-for="weekday in weekdays", :class="{'weekday_active': currentDate == weekday.date}")
      .weekday-tick
        img(src="../assets/img/tick-success.svg", alt="Tick")
      .weekday-title {{ weekday.day }}
      .weekday-date {{ weekday.date }} {{ weekday.month }}
</template>

<script>
export default {
  // data() {
  //   return {
  //     currentDate: 
  //   }
  // },
  computed: {
    weekdays() {
      let weekdays = []
      for (let i = 0; i < 8; i++) {
        const nextDay = new Date();
        nextDay.setDate(nextDay.getDate() + i)
        let day, date, month, weekdayObj
        switch (nextDay.getDay()) {
          case 1:
            day = 'Понедельник'
            break;
          case 2:
            day = 'Вторник'
            break;
          case 3:
            day = 'Среда'
            break;
          case 4:
            day = 'Четверг'
            break;
          case 5:
            day = 'Пятница'
            break;
          case 6:
            day = 'Суббота'
            break;
          case 0:
            day = 'Воскресенье'
            break;
          default:
            break;
        }
        date = nextDay.getDate()
        switch (nextDay.getMonth()) {
          case 0:
            month = 'Января'
            break;
          case 1:
            month = 'Февраля'
            break;
          case 2:
            month = 'Марта'
            break;
          case 3:
            month = 'Апреля'
            break;
          case 4:
            month = 'Мая'
            break;
          case 5:
            month = 'Июня'
            break;
          case 6:
            month = 'Июля'
            break;
          case 7:
            month = 'Августа'
            break;
          case 8:
            month = 'Сентября'
            break;
          case 9:
            month = 'Октября'
            break;
          case 10:
            month = 'Ноября'
            break;
          case 11:
            month = 'Декабря'
            break;
          default:
            break;
        }
        weekdayObj = { day: day, date: date, month: month }
        weekdays.push(weekdayObj)
      }
      return weekdays
    },
    currentDate() {
      const today = new Date()
      return today.getDate()
    }
  }
}
</script>

<style scoped lang="sass">
@import "../assets/sass/vars"

.weekdays
  border-top: 4px solid $c-middle
  border-bottom: 4px solid $c-middle
  margin: 50px 0
  .container
    display: flex
    justify-content: space-between
    align-items: stretch
    .weekday
      flex-basis: 12.5%
      padding: 15px 0 45px 0
      border-left: 2px solid $c-middle
      border-right: 2px solid $c-middle
      transition: 0.2s
      &:first-child
        border-left: 4px solid $c-middle
      &:last-child
        border-right: 4px solid $c-middle
      &-tick
        opacity: 1
        visibility: hidden
        width: 20px
        margin: 0 auto 10px auto
      &-title
        font-weight: bold
        font-size: 15px
        text-transform: uppercase
        margin-bottom: 13px
        transition: 0.2s
      &-date
        font-size: 13px
        text-transform: uppercase
        transition: 0.2s
      &_active
        background-color: $c-dark
        border-right: 2px solid $c-dark
        border-left: 2px solid $c-dark
        .weekday-title, .weekday-date
          color: $c-light
        &:first-child
          border-left: 4px solid $c-dark
        &:last-child
          border-right: 4px solid $c-dark
      &:hover
        background-color: $c-dark
        border-right: 2px solid $c-dark
        border-left: 2px solid $c-dark
        .weekday-title, .weekday-date
          color: $c-light
</style>