<template lang="pug">
.galleries
  .exchange_bar
    svg-icon(name="b" @click="changeComponent('OneGallery')").exchange__grid 
    svg-icon(name="bfc" @click="changeComponent('Folder')").exchange__folder
  .galleries__list
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
    }),
    changeComponent: function (component) {
      this.currentComponent = component
    }
  },
  mounted: function () {
    this.updateGalleries()
  }
}
</script>
<style lang="scss" scoped>
.galleries {
  &__list {
    margin-top: map-get($indents, veryBig);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
  }
}

.exchange_bar {
  margin-top: 1rem;
  // background-color:#E2DEDC;
  border-radius: 8px;
  display: flex;
  justify-content: right;
  padding: .5rem;
  align-items: center;
  box-shadow: 0 0 32px rgba(0,0,0, .15);
  
  .exchange__grid  {
    cursor: pointer;
    height: 27px;
    width: 27px;
    display: block;
    margin-left: auto;
    transform: scale3d(.95, .9, 1);
    transition: .3s;
  }
  .exchange__grid:hover {
    transform: scale3d(1, 1, 1);
  }
  .exchange__folder {
    cursor: pointer;
    height: 32px;
    width: 32px;
    display: block;
    margin-left: 12px;
    transform: scale3d(.95, .9, 1);
    transition: .3s;
  }
  .exchange__folder:hover {
   transform: scale3d(1, 1, 1);
    
  }
}
</style>