<template lang="pug">
.google-auth
  button.google-auth__button.btn.btn-white(@click="auth")
    svg-icon.google-auth__icon(name="google")
    .google-auth__text
      span.text-main-1 o
      span.text-google o
      span.text-main-3 g
      span.text-main-2 l
      span.text-main-1 e
</template>
<script>
export default {
  methods: {
    auth: async function () {
      const authCode = await this.$gAuth.getAuthCode()
      const response = await this.$http.post('http://your-backend-server-api-to-use-authcode', { code: authCode, redirect_uri: 'postmessage' })
    }
  }
}
</script>
<style lang="scss" scoped>
.google-auth {
  &__button {
    display: flex;
    align-items: flex-start;
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