<template lang="pug">
#app
  //- #nav
  //-   router-link(to="/") Home
  //-   span |
  //-   router-link(to="/about") About
  router-view
</template>

<style lang="sass">
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap')
@import "./assets/sass/vars"
@import "./assets/sass/reset"

// Common
body, button, input, a
  color: $c-dark
.container
  width: 1140px
  margin: 0 auto
.logo
  font-size: 40px
  font-weight: bold
  text-transform: uppercase
.btn
  width: 184px
  padding: 15px
  background-color: $c-dark
  border: 1px solid $c-dark
  font-size: 15px
  color: $c-light
  text-align: center
  transition: 0.2s
  &:hover
    background-color: transparent
    color: $c-dark
  &[disabled]
    filter: opacity(50%)
    &:hover
      background-color: $c-dark
      color: $c-light
  &_o
    background-color: transparent
    color: $c-dark
    &:hover
      background-color: $c-dark
      color: $c-light
    &[disabled]:hover
      background-color: transparent
      color: $c-dark

.v-select
  cursor: pointer
  position: relative
  .vs__search
    opacity: 0
    // visibility: hidden
    position: absolute
    top: 2px
    left: 2px
    z-index: -1
  .vs__dropdown-toggle
    display: flex
    justify-content: space-between
    align-items: center
    border: 3px solid $c-middle
  .select-arrow
    transition: 0.2s
    width: 14px
    height: 12px
    background-image: url("./assets/img/arrow-select.svg")
.v-select.vs--open
  .select-arrow
    transform: rotateX(180deg)

.select
  transition: 0.2s
  .vs
    &__dropdown
      &-toggle
        padding: 15px 24px
        color: darken($c-middle, 40)
      &-menu
        max-height: 400px
        overflow-y: scroll
        border-left: 3px solid $c-middle
        border-bottom: 3px solid $c-middle
        &::-webkit-scrollbar
          width: 4px
        &::-webkit-scrollbar-button
          height: 0
        &::-webkit-scrollbar-track
          background-color: $c-middle
        &::-webkit-scrollbar-track-piece
          background-color: $c-middle
        &::-webkit-scrollbar-thumb
          height: 50px
          background-color: $c-dark
        &::-webkit-scrollbar-corner
          background-color: $c-dark
        &::-webkit-resizer
          background-color: $c-dark
      &-option
        padding: 15px 25px
        font-weight: 500
        font-size: 18px
        transition: 0.2s
        &--selected
          background-color: $c-active
          color: $c-light
        &:hover
          background-color: $c-active
          color: $c-light
.select.vs--open
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.15)
</style>
