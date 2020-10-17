<template lang="pug">
.google-auth
  button(
    @click="auth"
  ).google-auth__button.btn.btn-outline-google
    svg-icon(name="google").google-auth__icon
    .google-auth__text
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
  &__button {
    display: flex;
    align-items: flex-start;
    .text-google {
      transition: .3s;
    }
    &:hover {
      .text-google {
        color: #fff !important;
      }
    }
  }
  &__icon {
    display: block;
    width: 24px;
    height: 24px;
  }
  &__text {
    font-size: 1.5rem;
    // margin-top: 8px;
    font-weight: 500;
  }
}
</style>