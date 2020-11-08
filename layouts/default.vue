<template lang="pug">
v-app( color="light" )
  SideBar(
    :miniVariant="miniVariant"
  )
  Navbar(
    :toggleMiniVariant="toggleMiniVariant"
    :miniVariant="miniVariant"
  )
  v-main(color="red lighten-5")
    v-container(fluid)
      nuxt
  v-footer(
    app
  )
    span &copy; {{ new Date().getFullYear() }}
  notifications(group="foo" position="right bottom")
    template(slot="body" slot-scope="props")
      v-alert(
        :type="props.item.type"
        border="left"
      )
        .title {{props.item.title}}
        div(v-html="props.item.text")
  vue-confirm-dialog
</template>
<script>
import SideBar from '~/components/Profile/SideBar'
import Navbar from '~/components/Profile/Navbar'
export default {
  middleware: 'verify',
  components: {
    SideBar,
    Navbar
  },
  data: () => ({
    miniVariant: false
  }),
  methods: {
    toggleMiniVariant: function () {
      this.miniVariant = !this.miniVariant
    }
  }
}
</script>
<style lang="scss" scoped></style>