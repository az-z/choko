<template lang="pug">
#NavigateItems
  .desctop
    .items
      nuxt-link(to="/").item Возможности
      nuxt-link(to="/").item Цены
      nuxt-link(to="/").item Войти
  .mobile
    Burger(:cb="toggleDropMenu")
    DropMenu(:showDropMenu="showDropMenu")
</template>
<script>
import Burger from './Burger'
import DropMenu from './DropMenu'
export default {
  components: {
    Burger,
    DropMenu
  },
  data: function () {return{
    showDropMenu: false
  }},
  methods: {
    toggleDropMenu: function () {
      this.showDropMenu = !this.showDropMenu
    }
  }
}
</script>
<style lang="scss" scoped>
#NavigateItems {
  margin-left: auto;
  margin-right: 1rem;
  .desctop .items {
    display: none;
    @media (min-width: 769px) {
      display: flex;
    }
  }

  .mobile {
    @media (min-width: 769px) {
      display: none;
    }
  }

  .item {
    display: block;
    color: map-get($mainColors, gray);
    padding: map-get($indents, middle);
    font-weight: 500;
    text-transform: uppercase;
    padding: 0 .5rem;
  }
}
</style>