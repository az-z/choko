<template lang="pug">
.drop-menu(:class="{'show': showDropMenu}")
  .drop-menu__body
    .drop-menu__items
      nuxt-link(to="/").drop-menu__item Возможности
      nuxt-link(to="/").drop-menu__item Цены
      nuxt-link(to="/").drop-menu__item Войти
</template>
<script>
export default {
  props: ['showDropMenu']
}
</script>
<style lang="scss" scoped>
.drop-menu {
  position: fixed;
  top: 4rem;
  right: -100%;
  transition: map-get($transitions, fast);
  
  &.show {
    right: 5%;
  }

  &__body {
    background-color: #fff;
    box-shadow: 0 0 8px rgba(0,0,0, .4);
    border-radius: 8px;
  }

  &__items {

  }

  &__item {
    display: block;
    padding: .1rem 1rem;
    color: map-get($mainColors, gray);
    font-weight: 500;
  }  
}
</style>