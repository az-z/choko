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
  v-chip(
    :color="user.active.status ? 'success' : 'error'"
    outlined
    class="ml-4" 
  )
    span( v-if="user.active.status && !user.active.trial" ) Активен
    span( v-if="user.active.status && user.active.trial" ) Триал
    span( v-if="user.active.to && user.active.status" ).ml-1 до: {{ new Date(user.active.to) | dateFormat('DD.MM.YYYY') }}
    span( v-if="!user.active.status" ) Не активе
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
import { mapGetters } from 'vuex'
import LanguageSwitcher from '~/components/LangSwitcher'
import Logo from '@/components/NavigateBar/Logo'
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
    LanguageSwitcher,
    Logo
  },
  computed: {
    ...mapGetters({
      user: 'Auth/getUser'
    })
  },
  methods: {
    swithThime: function () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  }
}
</script>
