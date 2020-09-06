<template lang="pug">
#logo
  nuxt-link.logo(to="/" :class="{'text-white': togglesBG}") FTKL.RU
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      togglesBG: 'NavigateBar/Scenery/getTogglesBG'
    })
  }
}
</script>
<style lang="scss" scoped>
.logo {
  color: map-get($mainColors, main-3);
  font-weight: 500;
  font-size: 1.25rem;
}
</style>