<template lang="pug">
.gallery(v-if="gallery")
  .gallery__header
    h1.gallery__title {{ gallery.title }}
    h2.gallery__user {{ gallery.creator.name }}
  .gallery__description {{ gallery.description }}
  .gallery__content
    h3.gallery__content-title Фотографии
  .gallery__footer
    .gallery_buttons
      button.btn.btn-main-2 Заказать
</template>
<script>
export default {
  layout: 'public',
  data: function () {return{
    gallery: null
  }},
  mounted: function () {
    this.$axios.get(`/gallery/get/${this.$route.params.id}`).then(response => {
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