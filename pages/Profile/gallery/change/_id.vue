<template lang="pug">
.change-gallery-page(v-if="gallery")
  v-row( class="align-center"  )
    v-col( cols="auto" )
      v-btn( to="/profile/gallery" icon nuxt )
        v-icon mdi-arrow-left
    v-col( cols="auto" )
      h1.change-gallery-page__title {{ $t('galleries.change.title') }}
  v-form(v-model="valid" @submit.prevent="changeUser")
    v-row
      v-col( cols="12"  )
        v-row( class="align-center"  )
          v-col( cols="auto" )
            v-btn(
              link outlined
              color="primary" block  
              :href="`${pathLink}gallery/${user.login}/${gallery._id}`"
            ) Ссылка
          v-col
            v-text-field(
              block
              :value="`${pathLink}gallery/${user.login}/${gallery._id}`"
            )
      v-col( cols="6" )
        v-row
          v-col 
            v-text-field(
              v-model="gallery.title"
              :rules="rules.title"
              :label="$t('forms.galleries.title')"
            )
            v-row
              v-col( cols="12" md="6" )
                v-text-field(
                  v-model="gallery.price"
                  :rules="rules.price"
                  :label="$t('forms.galleries.price')"
                )
              v-col( cols="12" md="6" )
                v-select(
                  :rules="rules.payment"
                  v-model="gallery.payment"
                  :items="items"
                  item-text="state"
                  item-value="abbr"
                  label="Тип оплаты"
                )
              v-col( cols="12" md="6" )
            v-checkbox(
              v-model="gallery.activity"
              :label="`Отображать папку в профиле?`"
            )
      v-col( cols="6" )
        v-textarea(
          v-model="gallery.description"
          :label="$t('forms.galleries.description')"
          filled auto-grow
        )
      v-col( cols="12" )
        v-file-input(
          :rules="rules.images"
          multiple show-size
          label="Загрузить фото"
          truncate-length="15"
          v-model="files"
          prepend-icon="mdi-image"
          accept=".jpg, .jpeg"
        )
      v-col( cols="12" )
        
      v-col( cols="12" )
        v-expansion-panels
          v-expansion-panel( outlined )
            v-expansion-panel-header Фото в папке
            v-expansion-panel-content
              v-row
                v-col(
                  v-for="(img, index) in gallery.images" :key="index"
                  sm="4"
                  md="2"
                )
                  v-card
                    v-img(
                      :src="img.path.xs"
                      height="150"
                    )
                      v-app-bar(
                        flat
                        color="rgba(0, 0, 0, 0)"
                      )
                        v-spacer
                        v-btn(
                          color="red" icon small
                          @click="removeImage(img._id)"
                        )
                          v-icon mdi-delete
                    v-card-text
                      small {{ img.originalName }}  
      v-col( cols="12" )
        v-btn(
          color="green"
          @click="change"
          :loading="loading"
          :disabled="upload"
          class="white--text" 
        ) {{ $t('buttons.save') }}
        v-btn(
          color="red"
          @click="remove"
          class="white--text" 
        ).ml-2 {{ $t('buttons.delete') }}
              
</template>
<script>
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

import { mapGetters, mapActions } from 'vuex'
export default {
  layout: 'profile',
  name: "ChangeFolder",
  data: function () {return{
    loading: false,
    loadingFiles: false,
    files: null,
    gallery: null,
    valid: null,
    upload: false,
    items: [
      { state: 'Наличными', abbr: 'cash' },
      { state: 'На карту', abbr: 'liqpay' }
    ],
    rules: {
      price: [
        value => !!value || 'Цена обязвтельна',
        value => /^[0-9]+$/.test(value) || 'Только цифры'
      ],
      images:  [
        value => {
          let fullSize = 0
          if (value) value.forEach(element => fullSize = fullSize + element.size) 
          return !value || fullSize < (this.user.storage.limit - this.user.storage.usage) || `Привышен лимит на диске: ${ formatBytes(fullSize) } / ${formatBytes(this.user.storage.limit - this.user.storage.usage)}`
        }
      ],
      title: [
        value => !!value || 'Название обязательно'
      ],
      payment: [
        value => !!value || 'Выберите тип оплаты'
      ]
    }
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
        this.showModal()
        this.$cookies.set('upload', true)
        this.updateImages(this.files)
        this.updateImagesCopy(this.files)
        this.uploadImages()
        this.updateMainTitle('Редактирование папки')
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
    this.upload = Boolean(this.$cookies.get('upload'))
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