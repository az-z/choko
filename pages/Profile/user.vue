<template lang="pug">
.user(v-if="user")
  //- div {{user}}
  h1.user__name {{ user.name }}
  .user__header
    img(:src="user.picture").user__img
    .user__info
      .user__email {{ user.email }}
      nuxt-link(:to="`/public/${user._id}`") Публичная страница
  .user__edite
    form(@submit.prevent="changeUser").user__form
      .user__form-group
        label(for="description").user__label О себе
        textarea(id="description" v-model="form.description")
      .user__form-group
        label(for="site").user__label Сайт
        input(id="site" v-model="form.site")
      .user__form-group
        label(for="facebook").user__label Facebook
        input(id="facebook" v-model="form.facebook")
      .user__form-group
        label(for="phone-number").user__label Номер телефона
        input(id="phone-number" v-model="form.phoneNumber" v-mask="'+38 (###) ###-##-##'")
      .user__buttons
        button.btn.btn-main-2 Сохранить
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  layout: 'profile',
  data: function () {return{
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
      this.$axios.put('/auth/user/change', this.form).then(response => {
        this.updateUser(response.data.user)
        this.$notify({
          group: 'foo',
          title: 'System',
          text: response.data.msg,
          type: 'success'
        })
      }).catch(error => console.error(error))
    }
  }
}
</script>
<style lang="scss" scoped>
.user {
  &__header {
    display: flex;
  }
  &__form {
    margin-top: 20px;
  }
  &__label {
    font-weight: 500;
  }
  &__form-group {
    margin-top: 12px;
  }
  &__buttons {
    margin-top: 20px;
  }
  &__img {
    width: 128px;
    height: 128px;
    object-fit: cover;
    border-radius: 16px;
  }
  &__info {
    margin-left: 20px;
  }
  &__email {
    font-size: 22px;
  }
  &__name {
    margin-bottom: 20px;
  }
}
</style>