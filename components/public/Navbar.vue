<template lang="pug">
v-app-bar(app dark)
  Logo
  v-spacer
  LanguageSwitcher
</template>
<script>
import Logo from '~/components/NavigateBar/Logo'
import LanguageSwitcher from '~/components/LangSwitcher'
export default {
  components: {
    Logo,
    LanguageSwitcher
  }
}
</script>