<template lang="pug">
v-btn(
  large
  block
  @click="auth"
  color="orange"
)
  svg-icon(name="google").google-auth__icon
  //- .google-auth__text.white--text
    span.text-main-1 o
    span.text-google o
    span.text-main-3 g
    span.text-main-2 l
    span.text-main-1 e
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