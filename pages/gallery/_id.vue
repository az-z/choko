<template lang="pug">
.gallery
  div {{ gallery }}
</template>
<script>
export default {
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