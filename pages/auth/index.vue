<template lang="pug">
v-container(
)
  v-row(
    class="justify-center align-center"
    style="height: 100vh"
  )
    v-col(
      colls="12"
      md="4"
      lg="6"
    )
      v-card
        v-card-title Авторизация
        v-form
          v-card-text
            v-text-field(
              label="Логин"
              v-model="form.login"
            )
            v-text-field(
              label="Пароль"
              v-model="form.password"
              type="password"
            )
          v-card-actions
            v-btn(
              color="primary"
              large
              @click="auth"
            ) Вход
</template>

<script>
import { mapActions } from 'vuex'
import AuthWindow from '~/components/Auth/AuthWindow'
export default {
  name: 'AuthPage',
  layout: 'auth',
  components: {
    AuthWindow
  },
  data: function () {return{
    form: {
      login: null,
      password: null
    }
  }},
  methods: {
    ...mapActions({
      signin: 'Admin/Auth/login'
    }),
    auth: async function () {
      try {
        const authResponse = await this.$axios.$post('/auth/admin/signin', this.form)
        localStorage.setItem('aToken', authResponse.token)
        this.signin()
        this.$notify({
          group: 'foo',
          type: 'success',
          title: 'System',
          text: authResponse.msg
        })
        this.$router.push('/admin')
      } catch (error) {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: 'System',
          text: error.response ? error.response.data.msg : 'Что-то пошло не так'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped</style>
