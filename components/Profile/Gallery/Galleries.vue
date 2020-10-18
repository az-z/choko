<template lang="pug">
.galleries
  v-card(color="light")
    v-row.align-center
      v-col
        v-card-text.py-0 Галереи
      v-col(sm="auto").black--textarea
        v-btn(
          :icon="picked !== 'Cards'"
          :color="picked === 'Cards' ? 'primary' : ''"
          fab
          small
          @click="picked = 'Cards'"
        )
          v-icon mdi-border-all
      v-col(sm="auto").mr-2.black--text
        v-btn(
          :icon="picked !== 'List'"
          :color="picked === 'List' ? 'primary' : ''"
          fab
          small
          @click="picked = 'List'"
        )
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
    picked: 'Cards'
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