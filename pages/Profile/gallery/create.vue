<template lang="pug">
.create-gallery-page
  h1.create-gallery-page__title Создание галереи
  v-form(v-model="valid" @submit.prevent="changeUser")
    v-text-field(
      v-model="form.title"
      label="Название"
    )
    v-text-field(
      v-model="form.price"
      label="Цена за фото"
      :rules="priceRules"
    )
    v-textarea(
      v-model="form.description"
      label="Описание"
    )
    v-switch(
      v-model="form.activity"
      :label="`Активность`"
    )
    v-file-input(
      counter
      multiple
      show-size
      small-chips
      truncate-length="15"
      v-model="files"
      prepend-icon="mdi-camera"
      @change="uploadFiles"
      accept=".jpg, .jpeg, .png"
      :loading="loadingFiles"
    )
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
      activity: false
    },
    gConfig: null,
  }},
  methods: {
    ...mapActions({
      addGallery: 'Galleries/addGallery'
    }),
    create: function () {
      this.addGallery({ notify: this.$notify, form: this.form, router: this.$router })
    },
    showDetails (data) {
     if(data.picked === 'picked') {
     }
    },
    uploadFiles: function () {
      this.loadingFiles = true
      console.log('Files: ', this.files);
      const fd = new FormData()
      this.files.forEach(function (file) {
        fd.append('images', file, file.name)
      })
      this.$axios.post('/gallery/add-images', fd).then(response => {
        this.loadingFiles = false
        this.$notify({
          group: 'foo',
          title: 'System',
          text: response.data.msg,
          type: 'success'
        })
        this.form.images = response.data.images
      }).catch(error => {
        this.loadingFiles = false
        this.$notify({
          group: 'foo',
          title: 'System',
          text: error.response.data.msg,
          type: 'error'
        })
      })
    }
  },
  created: function() {
    this.gConfig = {
      // The Browser API key obtained from the Google API Console.
      developerKey: 'AIzaSyCXa1P0S3uYjpNdtOzf1eqITumH_i2BGgo',

      // The Client ID obtained from the Google API Console. Replace with your own Client ID.
      clientId: process.env.GOOGLE_CLIENT_ID,

      // Scope to use to access user's drive.
      scope: 'https://www.googleapis.com/auth/drive.file'
    }
  }
}
</script>
<style lang="scss" scoped>
</style>