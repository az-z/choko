<template lang="pug">
.gallery
  v-row.gallery__first-block
    v-col.col-auto.gallery__block-create-gallery
      v-btn(
        dark nuxt
        color="primary"
        :to="user.active.status ? `/profile/gallery/create` : ''"
        :disabled="upload"
        @click="!user.active.status ? needActivate() : ''"
      ) {{ $t('buttons.createNewGallery') }}
    v-col
      Statistics
  Galleries
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ModalWindowAddGallery from '~/components/Profile/Gallery/Modals/AddGallery'
import ModalWindowChangeGallery from '~/components/Profile/Gallery/Modals/ChangeModal'
import Galleries from '~/components/Profile/Gallery/Galleries'
import Statistics from '~/components/Profile/Gallery/Statistics'
export default {
  name: 'ProfileGalleryPage',
  components: {
    ModalWindowAddGallery,
    ModalWindowChangeGallery,
    Galleries,
    Statistics
  },
  data: () => ({
    toggles: {
      windows: {
        add: false,
        change: false,
      }
    },
    upload: true
  }),
  computed: {
    ...mapGetters({
      user: 'Auth/getUser',
      gallery: 'Galleries/CreateGallery/GET_GALLERY'
    })
  },
  watch: {
    gallery: function () {
      this.upload = Boolean(this.$cookies.get('upload'))
    }
  },
  methods: {
    ...mapActions({
      updateGalleries: 'Galleries/updateGalleries'
    }),
    needActivate: function () {
      this.$notify({
        group: 'foo',
        type: 'error',
        title: 'System',
        text: 'Ваш статус неактивет перейдите во вкладку статус для оплаты'
      })
    }
  },
  mounted: function () {
    this.upload = Boolean(this.$cookies.get('upload'))
  },
  created: function () {
    this.updateGalleries()
  }
}
</script>
<style lang="scss" scoped></style>
