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
    LanguageSwitcher
</template>
<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import NavigateItems from './NavigateItems'
import LanguageSwitcher from '~/components/LangSwitcher'
export default {
  name: 'DefaultNavigateBar',
  components: {
    Logo,
    NavigateItems,
    LanguageSwitcher
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