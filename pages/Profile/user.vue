<template lang="pug">
.user
  v-row
    v-col.col-auto
      v-avatar(
        color="teal"
        rounded
        size="128"
      )
        img(
          v-if="user.picture"
          :src="user.picture"
          :alt="user.name"
        )
        span(v-else).white--text.headline {{ user.name }}
    v-col(
      cols="auto"
    )
      .headline {{ user.name }}
      v-btn(
        color="primary" 
        :href="`/public/${user.login}`"
        target="blank"
        nuxt
      ) {{ $t('profile.buttons.publicPage') }}
    //- v-col(
      cols="auto"
    //- )
      v-chip(
        :color="user.active.status ? 'success' : 'error'"
        outlined
      )
        span( v-if="user.active.status && !user.active.trial" ) Активен
        span( v-if="user.active.status && user.active.trial" ) Триал
        span( v-if="user.active.to" ).ml-1 до: {{ new Date(user.active.to) | dateFormat('DD.MM.YYYY') }}
        span( v-if="!user.active.status" ) Не активе
  .user__edite
    v-form(v-model="valid" @submit.prevent="changeUser")
      v-row
        v-col( cols="12" )
          v-textarea(
            v-model="form.description"
            :label="$t('forms.user.about')"
          )
        v-col( cols="12" )
          v-text-field(
            v-model="form.login"
            @input="checkLogin"
            :error="!loginPermit"
            :messages="loginMsg"
            :label="$t('forms.user.login')"
          )
        v-col(
          cols="12" md="4"
        )
          v-text-field(
            v-model="form.site"
            :label="$t('forms.user.site')"
          )
        v-col(
          cols="12" md="4"
        )
          v-text-field(
            v-model="form.facebook"
            label="Facebook"
          )
        v-col(
          cols="12" md="4"
        )
          v-text-field(
            v-model="form.instagram"
            label="Instagram"
          )
        v-col( cols="12" )
          v-text-field(
            v-model="form.phoneNumber"
            :label="$t('forms.user.phone')"
            v-mask="'+38 (###) ###-##-##'"
          )
        v-col( cols="12" )
          v-btn(
            @click="changeUser"
            :loading="loading"
            :disabled="!valid"
            color="success darken-2" 
          ) {{ $t('buttons.save') }}
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  layout: 'profile',
  name: 'ProfileUser',
  data: function () {return{
    valid: false,
    loading: false,
    loginPermit: true,
    form: {
      facebook: null,
      description: null,
      site: null,
      phoneNumber: null,
      login: null,
      instagram: null
    }
  }},
  computed: {
    ...mapGetters({
      user: 'Auth/getUser',
      // newForm: 'Auth/getForm'
    }),
    loginMsg: function () {
      return this.loginPermit ? 'Логин доступен' : 'Логин недоступен'
    }
  },
  watch: {
    user: function (newVal) {
      this.form.facebook = newVal.facebook
      this.form.description = newVal.description
      this.form.site = newVal.site
      this.form.phoneNumber = newVal.phoneNumber
      this.form.login = newVal.login
      this.form.instagram = newVal.instagram
    }
  },
  methods: {
    ...mapActions({
      updateUser: 'Auth/updateUser'
    }),
    changeUser: async function () {
      this.loading = true
      try {
        const response = await this.$axios.$put('/auth/user/change', this.form)
        this.updateUser(response.user)
        this.$notify({
          group: 'foo',
          title: 'System',
          text: response.msg,
          type: 'success'
        })
        this.loading = false
      } catch (error) {        
        console.error(error)
        this.$notify({
          group: 'foo',
          type: 'error',
          title: 'System',
          text: error.response ? error.response.data.msg : 'Что-то пошло не так'
        })
        this.loading = false
      }
    },
    checkLogin: async function () {
      try {
        const resonse = await this.$axios.$get(`/auth/checklogin/${this.form.login}`)
        this.loginPermit = true
      } catch (error) {
        console.error(error)
        this.$notify({
          group: 'foo',
          type: 'error',
          title: 'System',
          text: error.response ? error.response.data.msg : 'Что-то пошло не так'
        })
        this.loginPermit = false
      }
    }
  },
  mounted: function () {
    this.form.facebook = this.user.facebook
    this.form.description = this.user.description
    this.form.site = this.user.site
    this.form.phoneNumber = this.user.phoneNumber
    this.form.login = this.user.login
    this.form.instagram = this.user.instagram
  }
}
</script>
<style lang="scss" scoped>
// .user {
//   &__header {
//     display: flex;
//   }
//   &__form {
//     margin-top: 20px;
//   }
//   &__label {
//     font-weight: 500;
//   }
//   &__form-group {
//     margin-top: 12px;
//   }
//   &__buttons {
//     margin-top: 20px;
//   }
//   &__img {
//     width: 128px;
//     height: 128px;
//     object-fit: cover;
//     border-radius: 16px;
//   }
//   &__info {
//     margin-left: 20px;
//   }
//   &__email {
//     font-size: 22px;
//   }
//   &__name {
//     margin-bottom: 20px;
//   }
// }
</style>