<template lang="pug">
v-app-bar(
  clipped-left
  dark
  app
)
  //- v-app-bar-nav-icon(@click.stop="toggleMiniVariant")
  v-btn(
    icon
    @click.stop="toggleMiniVariant"
    class="mr-4" 
  )
    v-icon mdi-{{ `${miniVariant ? 'menu' : 'close'}` }}
  Logo
  v-spacer
  LanguageSwitcher
  v-btn(
    icon
    color="white"
    class="ml-3 mr-1" 
    @click="swithThime"
  )
    v-icon(color="white") mdi-theme-light-dark
</template>
<script>
import LanguageSwitcher from '~/components/LangSwitcher'
export default {
  name: 'ProfileNavigateBar',
  props: {
    toggleMiniVariant: {
      type: Function,
      required: true
    },
    miniVariant: {
      type: Boolean,
      required: true
    }
  },
  components: {
    LanguageSwitcher
  },
  methods: {
    swithThime: function () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  }
}
</script>
