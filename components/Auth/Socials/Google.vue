<template lang="pug">
.google-auth
  button.google-auth__button.btn.btn-white(@click="auth")
    svg-icon(name="google").google-auth__icon
    .google-auth__text
      span.text-main-1 o
      span.text-google o
      span.text-main-3 g
      span.text-main-2 l
      span.text-main-1 e
</template>
<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions({
      signin: 'Auth/signin'
    }),
    auth: async function () {
      const googleUser = await this.$gAuth.signIn()
      this.$axios.post(
        '/api/auth/google',
        { googleUser, redirect_uri: 'postmessage' }
        ).then(response => {
          this.signin(response.data.user)
          this.$axios.setToken(response.data.token, 'Bearer')
          localStorage.setItem('token', response.data.token)
          this.$notify({
            group: 'foo',
            title: 'SUCCESS',
            text: response.data.msg,
            type: 'success'
          })
          this.$router.push('/')
        }).catch(error => {
          this.$notify({
            group: 'foo',
            title: 'ERROR',
            text: error.response.data.msg,
            type: 'error'
          })
        })

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