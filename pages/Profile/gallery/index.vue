<template lang="pug">
.gallery
  v-row.gallery__first-block
    v-col.col-auto.gallery__block-create-gallery
      v-btn(
        dark                                                                                                                                                            
        color="primary"                                                                                                                                                
        :to="user.active.status ? `/profile/gallery/create` : ''"                                                                                                                                        
        nuxt
        :disabled="user.active.status"
        @click="!user.active.status ? needActivate() : ''"
      ) {{ $t('buttons.createNewGallery') }}
    v-col
      Statistics
  Galleries
</template>
<script>
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters({
      user: 'Auth/getUser'
    })
  },
  methods: {
    needActivate: function () {
      this.$notify({
        group: 'foo',
        type: 'error',
        title: 'System',
        text: 'Ваш статус неактивет перейдите во вкладку статус для оплаты'
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
