<template lang="pug">
v-app( color="light" )
  SideBar(
    :miniVariant="miniVariant"
  )
  Navbar(
    :toggleMiniVariant="toggleMiniVariant"
    :miniVariant="miniVariant"
  )
  v-main(color="red lighten-5")
    v-container(fluid)
      nuxt
  v-footer(
    app
  )
    span &copy; {{ new Date().getFullYear() }} - vue-mashins
  notifications(group="foo" position="right bottom")
    template(slot="body" slot-scope="props")
      v-alert(
        :type="props.item.type"
        border="left"
      )
        .title {{props.item.title}}
        div(v-html="props.item.text")
  vue-confirm-dialog
  ProgressGallery
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import SideBar from '~/components/Profile/SideBar'
import Navbar from '~/components/Profile/Navbar'
import ProgressGallery from '@/components/Profile/Gallery/Modals/ProgressCreateGallery'
export default {
  middleware: 'verify',
  components: {
    SideBar,
    Navbar,
    ProgressGallery
  },
  head: function () {return{
    title: 'Keytophoto | Лучший фото сервис'
  }},
  data: () => ({
    miniVariant: false
  }),
  methods: {
    ...mapActions({
      updateGallery: 'Galleries/CreateGallery/UPDATE_GALLEERY'
    }),
    toggleMiniVariant: function () {
      this.miniVariant = !this.miniVariant
    }
  },
  computed: {
    ...mapGetters({
      gallery: 'Galleries/CreateGallery/GET_GALLERY'
    })
  },
  beforeMount: function () {
    if (!this.gallery) {
      this.$cookies.remove('upload')
      this.updateGallery({})
      this.updateGallery(null)
    }
  },
  mounted: function () {
    const date = new Date()
    if (date.getHours() > 19 || date.getHours() < 6 ) this.$vuetify.theme.dark = true
    if (!this.gallery) {
      this.$cookies.remove('upload')
      this.updateGallery({})
      this.updateGallery(null)
    }
  },
  updated: function () {
    const date = new Date()
    if (date.getHours() > 19 || date.getHours() < 6 ) this.$vuetify.theme.dark = true
    if (!this.gallery) {
      this.$cookies.remove('upload')
      this.updateGallery({})
      this.updateGallery(null)
    }
  }
}
</script>
<style lang="scss" scoped></style>