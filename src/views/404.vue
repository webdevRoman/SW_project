<template lang="pug">
.page404-container
  .page404
    .page404-main
      .page404-main__text 404
      .page404-main__fork
        img(src="../assets/img/fork.png", alt="Fork")
      .page404-main__plate
        img(src="../assets/img/plate.png", alt="Plate")
      .page404-main__spoon
        img(src="../assets/img/spoon.png", alt="Spoon")
    .page404-error Ошибка! <br> Страница не найдена
    router-link.form-submit.page404-button(tag="button", to="/") Вернуться на сайт
</template>

<script>
export default {
  
}
</script>

<style scoped lang="sass">
@import "../assets/sass/vars"

.page404
  &-container
    display: flex
    align-items: center
    flex-direction: column
    min-height: 100vh
    background-color: $c-dark
  &-main
    position: relative
    margin-top: -90px
    &__text
      font-weight: bold
      font-size: 560px
      color: $c-light
      letter-spacing: 0.1em
    &__fork
      left: 145px
    &__plate
      top: 50%
      left: 50%
      transform: translateX(-52%) translateY(-48%)
      width: 610px
    &__spoon
      right: 145px
    .page404-main__fork, .page404-main__plate, .page404-main__spoon
      position: absolute
    .page404-main__fork, .page404-main__spoon
      height: 470px
      top: 115px
      img
        height: 100%
        width: auto
  &-error
    font-weight: 500
    font-size: 36px
    line-height: 60px
    color: $c-light
    letter-spacing: 0.1em
    text-align: center
    text-transform: uppercase
    margin-top: -80px
    margin-bottom: 25px
  &-button
    display: block
    width: 262px
    margin: 0 auto
</style>