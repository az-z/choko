export default {
  data: function () {return{
  }},
  computed: {
    signin: function () {
      return this.$store.getters['Auth/getSignin']
    }
  },
  methods: {
    auth: async function () {
      // if (this.signin) return this.$router.push('profile')
      const googleUser = await this.$gAuth.signIn()
      const authCode = await this.$gAuth.getAuthCode()
      this.$axios.post('/auth/google', { googleUser, redirect_uri: 'postmessage' }).then(response => {
          this.$store.dispatch('Auth/signin', response.data.user)
          this.$axios.setToken(response.data.token, 'Bearer')
          localStorage.setItem('token', response.data.token)
          this.$notify({
            group: 'foo',
            title: 'SUCCESS',
            text: response.data.msg,
            type: 'success'
          })
          this.$router.push('/profile/user')
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