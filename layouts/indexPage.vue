<template lang="pug">
v-app.default-layout(v-scroll:throttle="{fn: onScroll, throttle: 500 }")
  NavigateBarIndex
  v-main
    Nuxt
  Footer
  notifications(group="foo" position="right bottom")
    template(slot="body" slot-scope="props")
      v-alert(
        :type="props.item.type"
        border="left"
      )
        .title {{props.item.title}}
        div(v-html="props.item.text")
</template>
<script>
import { mapActions } from 'vuex'
import NavigateBarIndex from '~/components/NavigateBar'
import Footer from '~/components/Footer'
export default {
  middleware: 'verify',
  components: {
    NavigateBarIndex,
    Footer
  },
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
// .default-layout {
//   max-height: 100vh;
//   overflow-y: auto;
//   &::-webkit-scrollbar {
//     width: 4px;
//   }
//   &::-webkit-scrollbar-track {
//     box-shadow: inset 0 0 6px map-get($mainColors, main-3);
//   }
//   &::-webkit-scrollbar-thumb {
//     background-color: rgba(0, 0, 0, 0.637);
//     // outline: 1px solid rgb(0, 0, 0);
//   }
// }
</style>