export default {
  methods: {
    auth: async function () {
      const googleUser = await this.$gAuth.signIn()
      this.$axios.post(
        '/api/auth/google',
        { googleUser, redirect_uri: 'postmessage' }
        ).then(response => {
          this.$store.dispatch('Auth/signin', response.data.user)
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