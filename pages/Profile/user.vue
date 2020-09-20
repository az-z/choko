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
    form.user__form
      .user__form-group
        label(for="page").user__label Сайт
        input(v-model="form.page")
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'profile',
  data: function () {return{
    form: {
      page: null
    }
  }},
  computed: {
    ...mapGetters({
      user: 'Auth/getUser'
    })
  }
}
</script>
<style lang="scss" scoped>
.user {
  &__header {
    display: flex;
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
}
</style>