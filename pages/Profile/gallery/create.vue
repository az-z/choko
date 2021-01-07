<template lang="pug">
.create-gallery-page
  v-row.align-center
    v-col( cols="auto" )
      v-btn(
        nuxt icon
        :ripple="false"
        to="/profile/gallery"
      )
        v-icon mdi-arrow-left
    v-col( cols="auto" )
      h1 Создание галереи
  v-form(
    ref="form"
    v-model="valid"
    lazy-validation  
  )
    v-row
      v-col( cols="12" lg="6" )
        v-row
          v-col( cols="12" )
            v-text-field(
              v-model="form.title"
              label="Название"
              name="title"
              :rules="rules.title"
            )
          v-col( cols="6" )
            v-text-field(
              v-model="form.price"
              label="Цена за фото"
              :rules="rules.price"
              name="price"
            )
          v-col( cols="6" )
            v-select(
              v-model="form.payment"
              :items="items"
              item-text="state"
              item-value="abbr"
              label="Типо оплаты"
              :rules="rules.payment"
            )
          v-col( cols="12" )
            v-checkbox(
              v-model="form.activity"
              :label="`Отображать папку в профиле?`"
              name="public"
            )
      v-col( cols="12" lg="6" )
        v-row
          v-col( cols="12" )
            v-textarea(
              filled auto-grow
              v-model="form.description"
              label="Описание" name="description"
            )
      v-col( cols="12" )
        v-file-input(
          counter multiple
          show-size truncate-length="15"
          v-model="files"
          name="photos"
          prepend-icon="mdi-camera"
          accept=".jpg, .jpeg"
          :loading="loadingFiles"
          :rules="rules.images"
        )
      v-col( cols="12" )
        v-btn(
          large
          color="primary"
          @click="create"
          :disabled="!valid"
          :loading="loading || loadingFiles"
        ) Создать
</template>
<script>
import { mapActions } from 'vuex'
import FilePickerButton from 'vue-google-picker'
export default {
  layout: 'profile',
  name: 'CreateFolder',
  components: {
    FilePickerButton
  },
  data: function () {return{
    valid: false,
    loading: false,
    loadingFiles: false,
    rules: {
      price: [
        value => !!value || 'Цена обязвтельна',
        value => /^[0-9]+$/.test(value) || 'Только цифры'
      ],
      images:  [
        value => !value || value.size < 100000000 || 'Images size should be less than 100 MB!'
      ],
      title: [
        value => !!value || 'Название обязательно'
      ],
      payment: [
        value => !!value || 'Выберите тип оплаты'
      ]
    },
    files: null,
    form: {
      title: null,
      description: null,
      folder: null,
      price: null,
      images: null,
      activity: false,
      payment: null
    },
    gConfig: null,
    items: [
      { state: 'Наличными', abbr: 'cash' },
      { state: 'На карту', abbr: 'liqpay' }
    ],
  }},
  methods: {
    ...mapActions({
      addGallery: 'Galleries/addGallery',
      showModalCreateGallery: 'Galleries/CreateGallery/SHOW_MODAL',
      createGallery: 'Galleries/CreateGallery/CREATE_GALLERY',
      updateImages: 'Galleries/CreateGallery/UPDATE_IMAGES',
      updateImagesCopy: 'Galleries/CreateGallery/UPDATE_IMAGES_COPY',
      updateMainTitle: 'Galleries/CreateGallery/UPDATE_MAIN_TITLE'
    }),
    create: async function () {
      await this.$refs.form.validate()
      if (!this.valid) return;
      this.$router.push('/profile/gallery')
      this.showModalCreateGallery()
      this.updateImages(this.files)
      this.updateImagesCopy(this.files)
      this.createGallery(this.form)
      this.updateMainTitle('Создание папки')
      this.$cookies.set('upload', true)
    },
  }
}
</script>
<style lang="scss" scoped>
</style>