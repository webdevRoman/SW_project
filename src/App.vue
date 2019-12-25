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
</style>
