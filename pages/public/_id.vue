<template lang="pug">
.public-page(v-if="user")
  v-container
    v-row
      v-col(
        md="4"
      )
        v-card
          v-img(
            :src="user.picture"
            rounded
          )
      v-col
        v-card
          v-card-title {{ user.name }}
          .pa-4.subtitle {{ user.email }}
    v-list(
      v-if="user.galleries && user.galleries.length > 0"
    )
      v-list-item(
        v-for="(gallery, index) in user.galleries" :key="index"
        :to="`/gallery/${gallery._id}`" link
      )
        v-list-item-avatar(
          color="teal"
        )
          v-img(
            v-if="gallery.images"
            :src="gallery.images[0].path.small"
          )
          span( v-else class="white--text headline" ) {{ gallery.title.substr(0,1) }}
        v-list-item-content
          v-list-item-title(v-text="gallery.title")
          v-list-item-subtitle(v-text="gallery.price + 'грн'")
        v-list-item-action
          v-row
            v-btn(
              icon
              :to="`/gallery/${gallery._id}`"
            )
              v-icon(color="blue") mdi-open-in-app
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
    this.$axios.get(`/auth/get-public-user/${this.$route.params.id}`).then(response => {
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