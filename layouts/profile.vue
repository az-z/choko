<template lang="pug">
.profile.bg-dark
  SideBar
  .content.bg-light
    nuxt
    notifications(group="foo" position="right bottom")
</template>
<script>
import SideBar from '~/components/Profile/SideBar'
export default {
  middleware: 'verify',
  components: {
    SideBar
  }
}
</script>
<style lang="scss" scoped>
.profile {
  height: 100vh;
  display: grid;
  grid-template-columns: 180px 1fr;
}
.content {
  border-radius: 32px 0 0 32px;
  padding: 32px;
  box-shadow: 0 0 16px rgba(0,0,0,.3);
}
</style>