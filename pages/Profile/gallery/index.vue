<template lang="pug">
.gallery
  v-row.gallery__first-block
    v-col.col-auto.gallery__block-create-gallery
      v-btn(
        dark                                                                                                                                                            
        color="primary"                                                                                                                                                
        to="/profile/gallery/create"                                                                                                                                        
        nuxt 
      ) {{ $t('buttons.createNewGallery') }}
    v-col
      Statistics
  Galleries
</template>
<script>
import ModalWindowAddGallery from '~/components/Profile/Gallery/Modals/AddGallery'
import ModalWindowChangeGallery from '~/components/Profile/Gallery/Modals/ChangeModal'
import Galleries from '~/components/Profile/Gallery/Galleries'
import Statistics from '~/components/Profile/Gallery/Statistics'
export default {
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
<style lang="scss" scoped></style>
