<template lang="pug">
.weekdays
  button.weekdays-nav.weekdays-prev(@click.prevent="offset--", :disabled="offset == 0")
    .weekdays-arrow__prev
  button.weekdays-nav.weekdays-next(@click.prevent="offset++", :disabled="offset == 2 && screenWidth >= 768 || offset == 3")
    .weekdays-arrow__next
  .container
    .weekdays-container(:class="{'weekdays-container_1': offset == 1, 'weekdays-container_2': offset == 2, 'weekdays-container_3': offset == 3}")
      button.weekday(v-for="weekday in weekdays", :class="{'weekday_active': currentDate == weekday.date}")
        .weekday-tick
          img(src="../assets/img/tick-success.svg", alt="Tick")
        .weekday-title {{ weekday.day }}
        .weekday-date {{ weekday.date }} {{ weekday.month }}
</template>

<script>
export default {
  data() {
    return {
      // currentDate: '',
      offset: 0
    }
  },
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
    },
    screenWidth() {
      return document.body.clientWidth
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
  &-nav
    display: none
  &-container
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

@media(max-width: 1200px)
  html
    .weekdays
      margin: 35px 0
      .container
        .weekday
          padding: 15px 0 35px 0
          &-tick
            width: 17px
            margin: 0 auto 6px auto
          &-title
            font-size: 13px
          &-date
            font-size: 12px

@media(max-width: 992px)
  html
    .weekdays
      position: relative
      &-prev
        left: 25px
      &-next
        right: 25px
      &-nav
        display: flex
        justify-content: center
        align-items: center
        width: 26px
        height: 26px
        border: 2px solid $c-dark
        border-radius: 50%
        position: absolute
        top: 50%
        transform: translateY(-50%)
        .weekdays-arrow__prev, .weekdays-arrow__next
          width: 10px
          height: 10px
          border-top: 2px solid $c-dark
          border-right: 2px solid $c-dark
        .weekdays-arrow__prev
          transform: rotate(225deg)
          margin-right: -3px
        .weekdays-arrow__next
          transform: rotate(45deg)
          margin-right: 3px
        &[disabled]
          border: 2px solid lighten($c-dark, 40)
          .weekdays-arrow__prev, .weekdays-arrow__next
            border-top: 2px solid lighten($c-dark, 40)
            border-right: 2px solid lighten($c-dark, 40)
      .container
        width: 592px
        overflow: hidden
        .weekday
          flex-basis: 148px
          padding: 20px 0 45px 0
          &-tick
            width: 22px
            margin-bottom: 12px
          &-title
            font-size: 15px
            margin-bottom: 20px
          &-date
            font-size: 13px
      &-container
        justify-content: flex-start
        margin-left: 0
        margin-right: -592px
        transition: 0.2s
        &_1
          margin-left: -296px
          margin-right: -296px
        &_2
          margin-left: -592px
          margin-right: 0

@media(max-width: 768px)
  html
    .weekdays
      margin: 0 0 35px 0
      .container
        width: 296px
      &-container
        margin-left: 0
        margin-right: -888px
        &_1
          margin-left: -296px
          margin-right: -592px
        &_2
          margin-left: -592px
          margin-right: -296px
        &_3
          margin-left: -888px
          margin-right: 0

@media(max-width: 576px)
  html
    .weekdays
      margin-bottom: 20px
      &-prev
        left: 8px
      &-next
        right: 8px
      .container
        width: 240px
        .weekday
          flex-basis: 120px
          padding: 10px 0 35px 0
          &-tick
            width: 18px
          &-title
            font-size: 13px
            margin-bottom: 15px
          &-date
            font-size: 12px
      &-container
        margin-left: 0
        margin-right: -720px
        &_1
          margin-left: -240px
          margin-right: -480px
        &_2
          margin-left: -480px
          margin-right: -240px
        &_3
          margin-left: -720px
          margin-right: 0
</style>