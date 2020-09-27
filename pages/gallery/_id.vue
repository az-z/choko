<template lang="pug">
.gallery(v-if="gallery")
  .gallery__header
    h1.gallery__title {{ gallery.title }}
    h2.gallery__user {{ gallery.creator.name }}
</template>
<script>
export default {
  layout: 'public',
  data: function () {return{
    gallery: null
  }},
  mounted: function () {
    this.$axios.get(`/api/gallery/get/${this.$route.params.id}`).then(response => {
      this.gallery = response.data.gallery
    }).catch(error => console.error(error))
  }
}
</script>
<style lang="scss" scoped>
.gallery {
  &__header {
    
  }
}
</style>