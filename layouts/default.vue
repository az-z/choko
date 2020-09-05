<template lang="pug">
.default-layout(v-scroll:throttle="{fn: onScroll, throttle: 500 }")
  NavigateBar(:bg="bg")
  Nuxt
</template>
<script>
import NavigateBar from '~/components/NavigateBar'
export default {
  components: {
    NavigateBar
  },
  data: function () {return{
    possition: { scrollTop: 0, scrollLeft: 0 },
    bg: false
  }},
  methods: {
    onScroll: function (e, possition) {
      this.possition = possition
      this.bg = possition.scrollTop < 55
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
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.507);
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.637);
    outline: 1px solid rgb(0, 0, 0);
  }
}
</style>