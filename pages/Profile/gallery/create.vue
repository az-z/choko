<template lang="pug">
.create-gallery-page
  v-row
    v-col( cols="auto" )
      v-btn(
        icon nuxt
        to="/profile/gallery"
      )
        v-icon mdi-arrow-left
    v-spacer
    v-col( cols="auto" )
      h2 Создание галереи
  v-form(v-model="valid" @submit.prevent="changeUser")
    v-row
      v-col( cols="12" )
        v-text-field(
          v-model="form.title"
          label="Название"
          name="title"
        )
      v-col( cols="6" )
        v-text-field(
          v-model="form.price"
          label="Цена за фото"
          :rules="priceRules"
          name="price"
        )
      v-col( cols="6" )
        v-select(
          v-model="form.payment"
          :items="items"
          item-text="state"
          item-value="abbr"
          label="Типо оплаты"
        )
      v-col( cols="12" )
        v-textarea(
          v-model="form.description"
          label="Описание"
          name="description"
        )
      v-col( cols="12" )
        v-file-input(
          counter
          multiple
          show-size
          small-chips
          truncate-length="15"
          v-model="files"
          name="photos"
          prepend-icon="mdi-camera"
          accept=".jpg, .jpeg, .png"
          :loading="loadingFiles"
          :rules="rules.images"
        )
      v-col( cols="12" )
        v-switch(
          v-model="form.activity"
          :label="`Отображать папку в профиле?`"
          name="public"
        )
        .subtitle-2 
      v-col( cols="12" )
        v-btn(
          :disabled="!valid"
          @click="create"
          :loading="loading || loadingFiles"
        ) Создать
</template>
<script>
import { mapActions } from 'vuex'
import FilePickerButton from 'vue-google-picker'
export default {
  layout: 'profile',
  components: {
    FilePickerButton
  },
  data: function () {return{
    valid: false,
    loading: false,
    loadingFiles: false,
    priceRules: [
      value => !!value || 'Цена обязвтельна',
      value => /^[0-9]+$/.test(value) || 'Только цифры'
    ],
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
    rules: [
      images => !value || value.size < 100000000 || 'Images size should be less than 100 MB!',
    ]
  }},
  methods: {
    ...mapActions({
      addGallery: 'Galleries/addGallery',
      showModalCreateGallery: 'Galleries/CreateGallery/SHOW_MODAL',
      createGallery: 'Galleries/CreateGallery/CREATE_GALLERY',
      updateImages: 'Galleries/CreateGallery/UPDATE_IMAGES',
      updateImagesCopy: 'Galleries/CreateGallery/UPDATE_IMAGES_COPY'
    }),
    create: function () {
      this.$router.push('/profile/gallery')
      this.showModalCreateGallery()
      this.updateImages(this.files)
      this.updateImagesCopy(this.files)
      this.createGallery(this.form)
    },
  }
}
</script>
<style lang="scss" scoped>
</style>