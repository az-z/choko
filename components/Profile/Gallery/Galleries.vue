<template lang="pug">
.galleries
  v-card( :loading="loading"  )
    v-row.align-center
      v-col
        v-card-text.py-0 {{  $t('galleries.title') }}
      v-col(sm="auto").black--textarea
        v-btn-toggle( class="mr-4"  )
          v-btn( small @click="picked = 'Cards'" disabled  )
            v-icon mdi-border-all
          v-btn( small @click="picked = 'List'" )
            v-icon mdi-format-list-bulleted
  div(
    :is="picked"
    :galleries="galleries"
  )
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Cards from './Cards'
import List from './List'
export default {
  data: function () {return{
    currentComponent: 'Folder',
    picked: 'List',
    loading: true
  }},
  components: {
    Cards,
    List
  },
  computed: {
    ...mapGetters({
      galleries: 'Galleries/getGalleries',
      gallery: 'Galleries/CreateGallery/GET_GALLERY'
    })
  },
  watch: {
    gallery: function () {
      this.loading = Boolean(this.$cookies.get('upload'))
    }
  },
  methods: {
    changeComponent: function (component) {
      this.currentComponent = component
    }
  },
  mounted: function () {
    this.loading = Boolean(this.$cookies.get('upload'))
  }
}
</script>
<style lang="scss" scoped>

</style>