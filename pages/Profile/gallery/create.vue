<template lang="pug">
.create-gallery-page
  h1.create-gallery-page__title Создание галереи
  form(@submit.prevent="addGallery").create-gallery-page__form
    .create-gallery-page__form-group
      label( for="title" ).create-gallery-page__label Название
      input( type="text" id="title" name="title" v-model="form.title" ).create-gallery-page__input
    .create-gallery-page__form-group
      label( for="folder" ).create-gallery-page__label Ссылка на папку
      input( type="text" id="folder" name="folder" v-model="form.folder" ).create-gallery-page__input
    .create-gallery-page__form-group
      label( for="price" ).create-gallery-page__label Цена за фото
      input( type="text" id="price" name="price" v-model="form.price" ).create-gallery-page__input
    .create-gallery-page__form-group
      label( for="description" ).create-gallery-page__label Описание
      input( type="text" id="description" name="description" v-model="form.description" ).create-gallery-page__input
    .create-gallery-page__form-group
      input( type="checkbox" id="activity" name="activity" v-model="form.activity" ).create-gallery-page__input.checkbox-formater
      label( for="activity" ).create-gallery-page__label Активность
    .create-gallery-page__buttons
      button.btn.btn-main-2 Создать
</template>
<script>
import { mapActions } from 'vuex'
export default {
  layout: 'profile',
  data: function () {return{
    form: {
      title: null,
      description: null,
      folder: null,
      price: null,
      activity: false
    }
  }},
  methods: {
    ...mapActions({
      addGallery: 'Galleries/addGallery'
    }),
    create: function () {
      this.addGallery({ notify: this.$notify, form: this.form, router: this.$router })
    }
  }
}
</script>
<style lang="scss" scoped>
.create-gallery-page {
  &__form-group {
    margin-bottom: map-get($indents, big);
  }
  &__title {

  }
}
</style>