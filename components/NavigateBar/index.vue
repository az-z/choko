<template lang="pug">
nav(
  :class="{'bg-none': bg}"
).container
  Logo
  NavigateItems
</template>
<script>
import Logo from './Logo'
import NavigateItems from './NavigateItems'
export default {
  props: ['bg'],
  components: {
    Logo,
    NavigateItems
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
  &.bg-none {
    background-color: rgba(0,0,0,0);
  }
}
</style>