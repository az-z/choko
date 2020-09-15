<template lang="pug">
.default-layout(v-scroll:throttle="{fn: onScroll, throttle: 500 }")
  Nuxt
  notifications(group="foo" position="right bottom")
</template>
<script>
import { mapActions } from 'vuex'
export default {
  middleware: 'verify',
  methods: {
    ...mapActions({
      toggleBG: 'NavigateBar/Scenery/toggleBG'
    }),
    onScroll: function (e, possition) { 
      this.toggleBG(possition.scrollTop <= 1)
    }
  }
}
</script>
<style lang="scss" scoped>
.default-layout {
  max-height: 100vh;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px map-get($mainColors, main-3);
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.637);
    // outline: 1px solid rgb(0, 0, 0);
  }
}
</style>