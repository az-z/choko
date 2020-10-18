<template lang="pug">
.navigate-bar
  v-app-bar(
    color="light"
    dense
    fixed
    dark
  )
    v-toolbar-title
      Logo
    v-spacer
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
</style>