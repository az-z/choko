<template lang="pug">
.gallery
  ModalWindowChangeGallery(v-if="toggles.windows.change")
  h1.gallery__title Галереи
  .gallery__first-block
    .gallery__block-create-gallery
      nuxt-link(to="/profile/gallery/create").btn.btn-main-3 Создать новую галерею
    Statistics
  Galleries
</template>
<script>
import ModalWindowAddGallery from '~/components/Profile/Gallery/Modals/AddGallery'
import ModalWindowChangeGallery from '~/components/Profile/Gallery/Modals/ChangeModal'
import Galleries from '~/components/Profile/Gallery/Galleries'
import Statistics from '~/components/Profile/Gallery/Statistics'
export default {
  layout: 'profile',
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
        change: false
      }
    }
  }),
}
</script>
<style lang="scss" scoped>
.gallery {
  position: relative;
  &__first-block {
    display: flex;
    align-items: center;
  }
}
</style>