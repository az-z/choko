<template lang="pug">
.galeries
  //- OneGallery(
    v-for="(gallery, index) in galleries" :key="index"
    :gallery="gallery")
  Folder(
    v-for="(gallery, index) in galleries" :key="index"
    :gallery="gallery"
  )
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import OneGallery from './OneGallery'
import Folder from './Folder'
export default {
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
.galeries {
  margin-top: map-get($indents, veryBig);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
}
</style>