<template lang="pug">
div
  Header
  Navigation
  .image
    img(src="../assets/img/top-dish.png", alt="Dish image")
  Weekdays
  Dishes
  Footer
</template>

<script>
import Header from '../components/Header'
import Navigation from '../components/Navigation'
import Weekdays from '../components/Weekdays'
import Dishes from '../components/Dishes'
import Footer from '../components/Footer'

export default {
  name: 'home',
  components: {
    Header,
    Navigation,
    Weekdays,
    Dishes,
    Footer
  }
}
</script>

<style scoped lang="sass">
@import "../assets/sass/vars"

.image
  display: flex
  justify-content: flex-end
  height: 240px
  background-color: $c-middle
  img
    width: auto
    height: 100%
</style>