<template lang="pug">
.weekdays
  .container
    button.weekday.weekday_active
      .weekday-title Понедельник
      .weekday-date 23 декабря
    button.weekday
      .weekday-title Вторник
      .weekday-date 24 декабря
    button.weekday
      .weekday-title Среда
      .weekday-date 25 декабря
    button.weekday
      .weekday-title Четверг
      .weekday-date 26 декабря
    button.weekday
      .weekday-title Пятница
      .weekday-date 27 декабря
    button.weekday
      .weekday-title Суббота
      .weekday-date 28 декабря
    button.weekday
      .weekday-title Воскресенье
      .weekday-date 29 декабря
    button.weekday
      .weekday-title Понедельник
      .weekday-date 30 декабря
</template>

<script>
export default {
  
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
      padding: 45px 0
      border-left: 2px solid $c-middle
      border-right: 2px solid $c-middle
      transition: 0.2s
      &:first-child
        border-left: 4px solid $c-middle
      &:last-child
        border-right: 4px solid $c-middle
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