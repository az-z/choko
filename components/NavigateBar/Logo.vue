<template lang="pug">
#logo
  nuxt-link.logo(to="/" :class="{'text-white': togglesBG}")
    v-img(
      src="/logo_white.png"
      width="80"
    )
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
#logo {
  display: flex;
  align-items: center;
}
.logo {
  color: map-get($mainColors, white);
  font-weight: 500;
  font-size: 1.25rem;
  margin-left: 8px;
  text-transform: uppercase;
}
.logo-icon {
  width: 24px;
  height: 24px;
  fill: map-get($mainColors, main-3);
  &.fill-white {
    fill: map-get($mainColors, white);
  }
}
</style>