<template lang="pug">
.drop-menu(:class="{'show': showDropMenu}")
  .drop-menu__body(v-click-outside="hide")
    .drop-menu__items
      .drop-menu__item(@click="scrollTo('opportunities')") Возможности
      .drop-menu__item(@click="scrollTo('prices')") Цены
      .drop-menu__item(@click="scrollTo('baner')") Войти
</template>
<script>
import ClickOutside from 'vue-click-outside'
import MixinMoveTo from '~/mixins/moveTo'
export default {
  mixins: [MixinMoveTo],
  props: ['showDropMenu', 'hideDropMenu'],
  methods: {
    hide: function () {
      // if (this.showDropMenu) this.hideDropMenu()
    }
  },
  mounted () {
    // prevent click outside event with popupItem.
    this.popupItem = this.$el
  },
  // do not forget this section
  directives: {
    ClickOutside
  }
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
  &__item {
    display: block;
    padding: .1rem 1rem;
    color: map-get($mainColors, gray);
    font-weight: 500;
  }  
}
</style>