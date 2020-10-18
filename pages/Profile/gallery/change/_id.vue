<template lang="pug">
.change-gallery-page(v-if="gallery")
  h1.change-gallery-page__title Редактирование галереи
  v-form(v-model="valid" @submit.prevent="changeUser")
    v-text-field(
      v-model="gallery.title"
      label="Название"
    )
    v-text-field(
      v-model="gallery.price"
      label="Цена за фото"
    )
    v-textarea(
      v-model="gallery.description"
      label="Описание"
    )
    v-switch(
      v-model="gallery.activity"
      :label="`Активность`"
    )
    v-file-input(
      counter
      multiple
      show-size
      small-chips
      truncate-length="15"
      v-model="gallery.files"
      prepend-icon="mdi-camera"
    )
    v-row
      v-col(
        v-for="(img, index) in gallery.images" :key="index"
        sm="4"
        md="2"
        lg="1"
      )
        v-card
          v-img(
            :src="img.path.original"
            height="100"
          )
    v-btn(
      color="green"
      @click="change"
      :loading="loading"
    ) Изменить
    v-btn(
      color="red"
      @click="remove"
    ).ml-2 Удалить
</template>
<script>
import { mapActions } from 'vuex'
export default {
  layout: 'profile',
  data: function () {return{
    loading: false,
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
      this.loading = true
      this.$axios.put(`/gallery/change/${this.$route.params.id}`, this.gallery).then(response => {
        this.$notify({
          group: 'foo',
          title: 'System',
          text: response.data.msg,
          type: 'success'
        })
        this.loading = false
        this.$router.push('/profile/gallery')
      }).catch(error => {
        this.$notify({
          group: 'foo',
          title: 'System',
          text: error.response.data.msg,
          type: 'error'
        })
        this.loading = false
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
<style lang="scss" scoped></style>