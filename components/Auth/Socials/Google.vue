<template lang="pug">
v-btn(
  large
  block
  @click="auth"
  color="orange"
)
  svg-icon(name="google").google-auth__icon
</template>
<script>
import MixinAuth from '~/mixins/auth'
export default {
  mixins: [MixinAuth]
}
</script>
<style lang="scss" scoped>
.google-auth {
  &__icon {
    display: block;
    width: 24px;
    height: 24px;
  }
}
</style>