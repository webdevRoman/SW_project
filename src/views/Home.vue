<template lang="pug">
div
  Header
  Navigation
  .image
    img(src="../assets/img/dish.png", alt="Dish image")
</template>

<script>
import Header from '../components/Header'
import Navigation from '../components/Navigation'

export default {
  name: 'home',
  components: {
    Header,
    Navigation
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