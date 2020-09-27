<template lang="pug">
.public-page(v-if="user")
  .public-page__header
    img(:src="user.picture").public-page__img
    .public-page__info
      .public-page__name {{ user.name }}
      .public-page__email {{ user.email }}
  .public-page__galleries
    .public-page__tit Публичные галереи
    .public-page__gallery(
      v-for="(gallery, index) in user.galleries" :key="index"
    )
      nuxt-link(:to="`/gallery/${gallery._id}`").public-page__title {{ gallery.title }}
      .public-page__description {{ gallery.description }}
.public-page-error(v-else)
  h1 Пользователь не найден
</template>
<script>
export default {
  layout: 'public',
  data: () => ({
    user: null
  }),
  mounted: function () {
    this.$axios.get(`/api/auth/get-public-user/${this.$route.params.id}`).then(response => {
      this.user = response.data.user
    }).catch(error => console.error(error))
  }
}
</script>
<style lang="scss" scoped>
.public-page {
  &__header {
    display: flex;
  }
  &__info {
    margin-left: 20px;
  }
  &__img {
    width: 156px;
    height: 156px;
    border-radius: 20px;
  }
  &__galleries {
    background-color: map-get($mainColors, dark);
    color: #fff;
    margin-top: 30px;
  }
  &__gallery {
    background: #fff;
    padding: .5rem;
    color: map-get($mainColors, dark);
    border-bottom: 1px solid #d9d9d9;
    display: flex;
  }
  &__tit {
    padding: .5rem;
    font-size: 20px;
    font-weight: 600;
  }
  &__description {
    margin-left: 40px;
  }
}
</style>