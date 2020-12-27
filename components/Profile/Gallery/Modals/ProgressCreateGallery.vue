<template lang="pug">
v-card( v-if="show" ).progress-create-gallery
  v-card-title {{ title }}
  v-card-text 
    div {{ subTitle }}
    v-progress-linear( :value="progress" ) 
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      show: 'Galleries/CreateGallery/GET_SHOW_GALLERY',
      progress: 'Galleries/CreateGallery/GET_PROGRESS',
      subTitle: 'Galleries/CreateGallery/GET_PROGRESS_SUBTITLE',
      title: 'Galleries/CreateGallery/GET_MAIN_TITLE'
    })
  }
}
</script>
<style lang="scss" scoped>
.progress-create-gallery {
  position: fixed;
  right: 2em;
  bottom: 4em;
}
</style>