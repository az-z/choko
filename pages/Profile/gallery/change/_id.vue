<template lang="pug">
.change-gallery-page(v-if="gallery")
  v-row
    v-col( cols="auto" )
      v-btn( to="/profile/gallery" icon nuxt )
        v-icon mdi-arrow-left
    v-spacer
    v-col( cols="auto" )
      h1.change-gallery-page__title {{ $t('galleries.change.title') }}
  v-row( class="align-center"  )
    v-col( cols="auto" ) Ссылка
    v-col( cols="auto" )
      v-btn( nuxt text :href="`${pathLink}gallery/${user.login}/${gallery._id}`" ) {{ `${pathLink}gallery/${user.login}/${gallery._id}` }}
  v-form(v-model="valid" @submit.prevent="changeUser")
    v-row( class="align-center"  )
      v-col( cols="12" )
        v-text-field(
          v-model="gallery.title"
          :label="$t('forms.galleries.title')"
        )
      v-col( cols="12" md="6" )
        v-text-field(
          v-model="gallery.price"
          :label="$t('forms.galleries.price')"
        )
      v-col( cols="12" md="6" )
        v-select(
          v-model="gallery.payment"
          :items="items"
          item-text="state"
          item-value="abbr"
          label="Типо оплаты"
        )
    v-textarea(
      v-model="gallery.description"
      :label="$t('forms.galleries.description')"
    )
    v-switch(
      v-model="gallery.activity"
      :label="$t('forms.galleries.public')"
    )
    v-file-input(
      counter
      multiple
      show-size
      small-chips
      truncate-length="15"
      v-model="files"
      prepend-icon="mdi-camera"
    )
    v-row
      v-col(
        v-for="(img, index) in gallery.images" :key="index"
        sm="4"
        md="2"
        lg="1"
      )
        v-hover( v-slot="{ hover }" )
          v-card
            v-img(
              v-if="img.path"
              :src="img.path.original"
              height="100"
            )
              v-app-bar(
                flat
                color="rgba(0, 0, 0, 0)"
              )
               v-spacer
               v-btn(
                 color="red"
                 icon
                 @click="removeImage(img._id)"
               )
                v-icon mdi-delete       
    v-btn(
      color="green"
      @click="change"
      :loading="loading"
      class="white--text" 
    ) {{ $t('buttons.save') }}
    v-btn(
      color="red"
      @click="remove"
      class="white--text" 
    ).ml-2 {{ $t('buttons.delete') }}
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  layout: 'profile',
  data: function () {return{
    loading: false,
    loadingFiles: false,
    files: null,
    gallery: null,
    valid: null,
    items: [
      { state: 'Наличными', abbr: 'cash' },
      { state: 'На карту', abbr: 'liqpay' }
    ]
  }},
  computed: {
    ...mapGetters({
      user: 'Auth/getUser'
    }),
    pathLink: function () {
      return `${window.location.protocol}//${window.location.host}/`
    }
  },
  methods: {
    ...mapActions({
      updateGalleryForChange: 'Galleries/CreateGallery/UPDATE_GALLEERY',
      updateImages: 'Galleries/CreateGallery/UPDATE_IMAGES',
      updateImagesCopy: 'Galleries/CreateGallery/UPDATE_IMAGES_COPY',
      uploadImages: 'Galleries/CreateGallery/UPLOAD_IMAGES',
      changeGallery: 'Galleries/CreateGallery/CHANGE_GALLERY',
      showModal: 'Galleries/CreateGallery/SHOW_MODAL',
      updateMainTitle: 'Galleries/CreateGallery/UPDATE_MAIN_TITLE'
    }),
    delete: function () {
      this.$axios.delete(`/gallery/delete/${this.$route.params.id}`).then(response => {
        this.$notify({
          group: 'foo',
          title: 'System',
          text: response.data.msg,
          type: 'success'
        })
        this.$router.push('/profile/gallery')
      }).catch(error => {
        this.$notify({
          group: 'foo',
          title: 'System',
          text: error.response.data.msg,
          type: 'error'
        })
        console.error(error)
      })
    },
    remove: function () {
       this.$confirm({
          message: `Действитеьно удалить галерею: "${this.gallery.title}"?`,
          button: {
            no: 'Отменить',
            yes: 'Удалить'
          },
          callback: confirm => {
            if (confirm) {
              this.delete()
            }
          }
      })
    },
    change: function () {
      this.$router.push('/profile/gallery')
      this.updateGalleryForChange(this.gallery)
      if (this.files) {
        this.updateImages(this.files)
        this.updateImagesCopy(this.files)
        this.uploadImages()
        this.updateMainTitle('Редактирование папки')
        this.showModal()
      } else {
        this.changeGallery()
      }
    },
    removeImage: function (id) {
      this.$axios.delete(`/gallery/remove/file/${this.$route.params.id}/${id}`).then(response => {
        this.$notify({
          group: 'foo',
          type: 'success',
          title: 'System',
          text: response.data.msg
        })
        this.gallery.images = this.gallery.images.filter(element => element._id !== id)
      }).catch(error => {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: 'System',
          text: error.response.data.msg
        })
      })
    }
  },
  mounted: function () {
    this.$axios.get(`/gallery/get/${this.$route.params.id}`).then(response => {
      this.gallery = response.data.gallery
    }).catch(error => {
      console.error(error)
      this.$notify({
        group: 'foo',
        title: 'System',
        text: error.response.data.msg,
        type: 'error'
      })
    })
  },
}
</script>
<style lang="scss" scoped></style>