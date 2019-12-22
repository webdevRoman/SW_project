<template lang="pug">
.header
  .container
    .user-img
      img(src="../assets/img/user.svg", alt="User Image")
    .user-name Фамилия Имя
</template>

<script>
export default {
  
}
</script>

<style scoped lang="sass">
@import "../assets/sass/vars"

.header
  padding: 9px 0
  background-color: $c-dark
  .container
    display: flex
    justify-content: flex-end
    align-items: center
    .user
      &-img
        width: 32px
        height: 32px
        padding: 5px
        background-color: #FAFAFA
        border-radius: 50%
        overflow: hidden
        margin-right: 13px
      &-name
        font-weight: bold
        font-size: $fz-subtitle
        color: $c-light
</style>