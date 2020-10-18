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
    v-col
      .white--text.headline {{ user.name }}
      v-btn(:to="`/public/${user._id}`" exact nuxt) Публичная страница
  .user__edite
    v-form(v-model="valid" @submit.prevent="changeUser")
      v-textarea(
        v-model="form.description"
        label="О себе"
      )
      v-text-field(
        v-model="form.site"
        label="Сайт"
      )
      v-text-field(
        v-model="form.facebook"
        label="Facebook"
      )
      v-text-field(
        v-model="form.phoneNumber"
        label="Номер телефона"
        v-mask="'+38 (###) ###-##-##'"
      )
      v-btn(
        @click="changeUser"
        :loading="loading"
      ) Сохранить
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  layout: 'profile',
  data: function () {return{
    valid: false,
    loading: false,
    form: {
      facebook: null,
      description: null,
      site: null,
      phoneNumber: null
    },
  }},
  computed: {
    ...mapGetters({
      user: 'Auth/getUser',
      // newForm: 'Auth/getForm'
    })
  },
  watch: {
    user: function (newVal) {
      this.form.facebook = newVal.facebook
      this.form.description = newVal.description
      this.form.site = newVal.site
      this.form.phoneNumber = newVal.phoneNumber
    }
  },
  methods: {
    ...mapActions({
      updateUser: 'Auth/updateUser'
    }),
    changeUser: function () {
      this.loading = true
      this.$axios.put('/auth/user/change', this.form).then(response => {
        this.updateUser(response.data.user)
        this.$notify({
          group: 'foo',
          title: 'System',
          text: response.data.msg,
          type: 'success'
        })
        this.loading = false
      }).catch(error => {
        this.loading = false
        console.error(error)
      })
    }
  },
  mounted: function () {
    this.form.facebook = this.user.facebook
    this.form.description = this.user.description
    this.form.site = this.user.site
    this.form.phoneNumber = this.user.phoneNumber
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