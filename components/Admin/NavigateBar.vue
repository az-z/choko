<template lang="pug">
v-app-bar(app clipped-left dark)
  Logo
</template>
<script>
import Logo from '~/components/NavigateBar/Logo'
export default {
  name: 'AdminNavbar',
  components: {
    Logo
  }
}
</script>