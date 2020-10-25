<template lang="pug">
.view-gallery(v-if="gallery")
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
</template>
<script>
export default {
  name: 'ViewGallery',
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
<style lang="scss" scoped></style>
