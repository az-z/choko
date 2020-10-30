<template lang="pug">
v-app
  Navbar
  v-main
    nuxt
  v-footer(
    class="font-weight-medium"
    dark
  )
    v-col(
      class="text-center"
      cols="12"
    )
      span {{ new Date().getFullYear() }} — 
      strong  Nevvord
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
import Navbar from '~/components/public/Navbar'
export default {
  components: {
    Navbar
  }
}
</script>
<style lang="scss" scoped>

</style>