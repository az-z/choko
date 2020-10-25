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
      strong  Vuetify
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