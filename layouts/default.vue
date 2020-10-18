<template lang="pug">
v-app()
  SideBar
  v-main(color="red lighten-5")
    v-container(fluid)
      nuxt
  v-footer(
    app
  )
    span &copy; {{ new Date().getFullYear() }}
  notifications(group="foo" position="right bottom")
  vue-confirm-dialog
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
<style lang="scss" scoped></style>