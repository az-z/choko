<template lang="pug">
.galleries
  v-card(color="light")
    v-row.align-center
      v-col
        v-card-text.py-0 {{  $t('galleries.title') }}
      v-col(sm="auto").black--textarea
        v-btn-toggle( class="mr-4"  )
          v-btn( small @click="picked = 'Cards'" )
            v-icon mdi-border-all
          v-btn( small @click="picked = 'List'")
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
    picked: 'List'
  }},
  components: {
    Cards,
    List
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

</style>