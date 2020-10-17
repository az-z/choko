<template lang="pug">
.galleries
  .gallery(
    :is="currentComponent"
    v-for="(gallery, index) in galleries" :key="index"
    :gallery="gallery"
  )
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import OneGallery from './OneGallery'
import Folder from './Folder'
export default {
  data: function () {return{
    currentComponent: 'Folder'
  }},
  components: {
    OneGallery,
    Folder
  },
  computed: {
    ...mapGetters({
      galleries: 'Galleries/getGalleries'
    })
  },
  methods: {
    ...mapActions({
      updateGalleries: 'Galleries/updateGalleries'
    })
  },
  mounted: function () {
    this.updateGalleries()
  }
}
</script>
<style lang="scss" scoped>
.galleries {
  margin-top: map-get($indents, veryBig);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
}
</style>