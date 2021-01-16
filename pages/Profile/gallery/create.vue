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
      h1 {{ $t('profile.gallery.create') }}
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
              :label="$t('profile.gallery.name')"
              name="title"
              :rules="rules.title"
            )
          v-col( cols="6" )
            v-text-field(
              v-model="form.price"
              :label="$t('profile.gallery.price')"
              :rules="rules.price"
              name="price"
            )
          v-col( cols="6" )
            v-select(
              v-model="form.payment"
              :items="items"
              item-text="state"
              item-value="abbr"
              :label="$t('profile.gallery.payment_type')"
              :rules="rules.payment"
            )
          v-col( cols="12" )
            v-checkbox(
              v-model="form.activity"
              :label="$t('profile.gallery.public')"
              name="public"
            )
      v-col( cols="12" lg="6" )
        v-row
          v-col( cols="12" )
            v-textarea(
              filled auto-grow
              v-model="form.description"
              :label="$t('profile.gallery.desc')"
              name="description"
            )
      v-col( cols="12" )
        v-file-input(
          counter multiple
          truncate-length="15"
          v-model="files"
          name="photos"
          prepend-icon="mdi-camera"
          accept=".jpg, .jpeg"
          :rules="rules.images"
          :loading="loadingFiles"
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
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
import { mapGetters, mapActions } from 'vuex'
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
        value => !!value || this.$t('profile.gallery.price_rule'),
        value => /^[0-9]+$/.test(value) || this.$t('profile.gallery.digits_rule')
      ],
      images:  [
        value => {
          let fullSize = 0
          if (value) value.forEach(element => fullSize = fullSize + element.size)
          const msg = `${ this.$t('profile.gallery.space_rule') }: ${ formatBytes(fullSize) } / ${ formatBytes(this.user.storage.limit - this.user.storage.usage) }`
          return !value || fullSize < (this.user.storage.limit - this.user.storage.usage) || msg
        }
      ],
      title: [
        value => !!value || this.$t('profile.gallery.title_rule') 
      ],
      payment: [
        value => !!value || this.$t('profile.gallery.payment_type')
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
      { state: this.$t('profile.gallery.payment_cash'), abbr: 'cash' },
      { state: this.$t('profile.gallery.payment_card'), abbr: 'liqpay' }
    ],
  }},
  computed: {
    ...mapGetters({
      user: 'Auth/getUser'
    })
  },
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
      this.updateMainTitle(this.$t('profile.gallery.create'))
      this.$cookies.set('upload', true)
    },
  }
}
</script>
<style lang="scss" scoped></style>
