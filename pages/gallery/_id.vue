<template lang="pug">
.gallery
  h1.gllery__title {{ gallery.title }}
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