<template lang="pug">
v-app( v-if="!loading" )
  SideBar
  Navbar
  v-main
    nuxt
  v-footer(
    app
    class="font-weight-medium"
    dark
  )
    v-col(
      class="text-center"
      cols="12"
    )
      span {{ new Date().getFullYear() }} — 
      strong  Nevvord
  notifications(group="foo" position="right bottom")
    template(slot="body" slot-scope="props")
      v-alert(
        :type="props.item.type"
        border="left"
      )
        .title {{props.item.title}}
        div(v-html="props.item.text")
v-app(v-else)
  v-main
    v-row(
      class="justify-center align-center"
      style="height: 100vh"
    )
      v-col(
        sm="1"
        height="32px" 
      )
        v-progress-circular(
          indeterminate
          color="primary"
        )
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Navbar from '~/components/Admin/NavigateBar'
import SideBar from '~/components/Admin/Sidebar'
export default {
  name: 'admin',
  components: {
    Navbar,
    SideBar
  },
  data: function () {return{
    loading: true
  }},
  computed: {
    ...mapGetters({
      auth: 'Admin/Auth/getAuth'
    })
  },
  methods: {
    ...mapActions({
      login: 'Admin/Auth/login'
    })
  },
  beforeCreate: async function () {
    if (this.auth) return ''
    const token = localStorage.getItem('aToken')
    if (!token) this.$router.push('/')
    this.$axios.setToken(token, 'bearer')
    try {
      const verifyResponse = await this.$axios.$get('/auth/admin/verify')
      this.login()
      this.loading = false
      this.$notify({
        group: 'foo',
        type: 'success',
        title: 'System',
        text: verifyResponse.msg
      })
    } catch (error) {    
      console.error(error)
      this.$router.push('/')
      this.$notify({
        group: 'foo',
        type: 'success',
        title: 'System',
        text: error.response ? error.response.data.msg : 'Что-то пошло не так'
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>