<template lang="pug">
.gallery(v-if="gallery")
  v-container
    .gallery__header
      h1.gallery__title {{ gallery.title }}
      h2.gallery__user {{ gallery.creator.name }}
    .gallery__description {{ gallery.description }}
    .gallery__content
      h3.gallery__content-title Фотографии
      v-row
        v-col(
          v-for="(image, index) in gallery.images" :key="index"
          sm="1"
          md="3"
        )
          v-card
            v-img(
              :src="image.path.small"
            )
    .gallery__footer
      v-btn Заказать
</template>
<script>
export default {
  layout: 'public',
  data: function () {return{
    gallery: null
  }},
  mounted: function () {
    this.$axios.get(`/gallery/get/public/${this.$route.params.id}`).then(response => {
      this.gallery = response.data.gallery
    }).catch(error => console.error(error))
  }
}
</script>
<style lang="scss" scoped>
.gallery {
  &__header {
    display: flex;
  }
  &__user {
    margin-left: auto;
  }
  &__description {
    padding: .5rem;
    margin-top: .5rem;
    margin-bottom: .5rem;
    border-radius: 20px;
    background-color: #fff;
  }
}
</style>