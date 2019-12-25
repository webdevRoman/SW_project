<template lang="pug">
footer.footer
  .container
    .footer-top
      .footer-contacts
        .contacts-item
          .contacts-item__title доставка:
          a.contacts-item__contact(href="tel:+73822214111") +7 (3822) 214-111
        .contacts-item
          .contacts-item__title служба поддержки:
          a.contacts-item__contact(href="mailto:mail@edatomsk.ru") mail@edatomsk.ru
      .logo Логотип
    .footer-bot
      a.footer-bot__policy(href="#") Политика конфиденциальности
  button.btn-up(@click.prevent="scrollToTop()")
    img.btn-up__arrow(src="../assets/img/arrow-up.svg", alt="Arrow image")
</template>

<script>
export default {
  methods: {
    scrollToTop() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  }
}
</script>

<style scoped lang="sass">
@import "../assets/sass/vars"

.footer
  padding: 35px 0 20px 0
  background-color: $c-dark
  color: $c-light
  &-top
    display: flex
    justify-content: space-between
    align-items: center
    padding-bottom: 35px
    border-bottom: 1px solid $c-middle
  &-contacts
    flex-basis: 584px
    display: flex
    justify-content: space-between
    align-items: center
    .contacts-item
      flex-basis: 262px
      margin-right: 30px
      &__title
        font-size: 15px
        margin-bottom: 12px
      &__contact
        font-weight: 500
        font-size: 18px
        color: $c-light
        transition: 0.2s
        &:hover
          color: $c-active
  &-bot
    padding-top: 12px
    &__policy
      font-size: 13px
      color: $c-light
      text-decoration: underline
      transition: 0.2s
      &:hover
        color: $c-active

.btn-up
  position: fixed
  bottom: 30px
  right: 55px
  display: flex
  justify-content: center
  align-items: center
  width: 45px
  height: 45px
  padding: 7px
  border-radius: 3px
  background-color: $c-middle
  transition: 0.2s
  &:hover
    transform: rotate(45deg)
    .btn-up__arrow
      transform: rotate(-45deg)
  &__arrow
    width: auto
    height: 100%
    transition: 0.2s
</style>