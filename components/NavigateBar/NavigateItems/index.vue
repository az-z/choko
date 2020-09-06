<template lang="pug">
#NavigateItems
  .desctop
    .items
      .item(@click="scrollTo('opportunities')" :class="{'text-white': togglesBG}") Возможности
      .item(@click="scrollTo('prices')" :class="{'text-white': togglesBG}") Цены
      nuxt-link(to="/" :class="{'text-white': togglesBG}").item Войти
  .mobile
    Burger(:cb="toggleDropMenu" :showDropMenu="showDropMenu")
    DropMenu(:showDropMenu="showDropMenu" :hideDropMenu="hideDropMenu")
</template>
<script>
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters({
      togglesBG: 'NavigateBar/Scenery/getTogglesBG'
    })
  },
  methods: {
    toggleDropMenu: function () {
      this.showDropMenu = !this.showDropMenu
    },
    hideDropMenu: function () {
      this.showDropMenu = false
    },
    scrollTo: (id) => {
      document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'end' })
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
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>