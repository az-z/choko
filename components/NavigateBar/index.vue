<template lang="pug">
nav(
  :class="{'bg-none': togglesBG}"
).container
  Logo
  NavigateItems
</template>
<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import NavigateItems from './NavigateItems'
export default {
  components: {
    Logo,
    NavigateItems
  },
  computed: {
    ...mapGetters({
      togglesBG: 'NavigateBar/Scenery/getTogglesBG'
    })
  }
}
</script>
<style lang="scss" scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  z-index: 1;
  height: 85px;
  background-color: #fff;
  align-items: center;
  transition: map-get($transitions, fast);
  box-shadow: 0 0 4px rgba(0,0,0, .4);
  &.bg-none {
    background-color: rgba(0,0,0,0);
    box-shadow: none;
  }
}
</style>