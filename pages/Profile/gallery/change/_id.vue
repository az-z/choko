<template lang="pug">
.change-gallery-page(v-if="gallery")
  h1.change-gallery-page__title Редактирование галереи
  form(@submit.prevent="change").change-gallery-page__form
    .change-gallery-page__form-group
      label( for="title" ).change-gallery-page__label Название
      input( type="text" id="title" name="title" v-model="gallery.title" ).change-gallery-page__input
    .change-gallery-page__form-group
      label( for="folder" ).change-gallery-page__label Ссылка на папку
      input( type="text" id="folder" name="folder" v-model="gallery.folder" ).change-gallery-page__input
    .change-gallery-page__form-group
      label( for="price" ).change-gallery-page__label Цена за фото
      input( type="text" id="price" name="price" v-model="gallery.price" ).change-gallery-page__input
    .change-gallery-page__form-group
      label( for="description" ).change-gallery-page__label Описание
      input( type="text" id="description" name="description" v-model="gallery.description" ).change-gallery-page__input
    .change-gallery-page__form-group
      input( type="checkbox" id="activity" name="activity" v-model="gallery.activity" ).change-gallery-page__input.checkbox-formater
      label( for="activity" ).change-gallery-page__label Активность
    .change-gallery-page__buttons
      button.btn.btn-main-2 Изменить
      button(
        type="button" @click="remove"
      ).btn.btn-main-1.change-gallery-page__button-remove Удалить
</template>
<script>
import { mapActions } from 'vuex'
export default {
  layout: 'profile',
  data: function () {return{
    gallery: null
  }},
  methods: {
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
      this.$axios.put(`/gallery/change/${this.$route.params.id}`, this.gallery).then(response => {
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
    }
  },
  mounted: function () {
    this.$axios.get(`/gallery/get/${this.$route.params.id}`).then(response => {
      this.gallery = response.data.gallery
    }).catch(error => {
      this.$notify({
        group: 'foo',
        title: 'System',
        text: error.response.data.msg,
        type: 'error'
      })
      console.error(error)
    })
  }
}
</script>
<style lang="scss" scoped>
.change-gallery-page {
  &__form-group {
    margin-bottom: map-get($indents, big);
  }
  &__buttons {
    display: flex;
  }
  &__button-remove {
    margin-left: auto;
  }
}
</style>