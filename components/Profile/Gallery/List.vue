<template lang="pug">
v-list(
  two-line
  subheader
  v-if="galleries && galleries.length > 0"
)
  v-list-item(
    v-for="(gallery, index) in galleries" :key="index"
  )
    v-list-item-avatar
      v-img(
        :src="gallery.images[0].path.original"
      )
    v-list-item-content
      v-list-item-title(v-text="gallery.title")
      v-list-item-subtitle(v-text="gallery.price + 'грн'")
    v-list-item-content
      v-list-item-title(v-text="gallery.description")
    v-list-item-action
      v-row
        v-btn(
          icon
          :to="`/profile/gallery/change/${gallery._id}`"
        )
          v-icon(color="grey lighten-1") mdi-cog
        v-btn(icon @click="remove(gallery.title, gallery._id)")
          v-icon(color="red") mdi-close-circle
.overline(v-else) Нет галерей
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: {
    galleries: {
      type: Array,
      required: true
    }
  },
  methods: {
    ...mapActions({
      updateGalleries: 'Galleries/updateGalleries'
    }),
    delete: function (id) {
      this.$axios.delete(`/gallery/delete/${id}`).then(response => {
        this.$notify({
          group: 'foo',
          title: 'System',
          text: response.data.msg,
          type: 'success'
        })
        this.updateGalleries()
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
    remove: function (title, id) {
       this.$confirm({
          message: `Действитеьно удалить галерею: "${title}"?`,
          button: {
            no: 'Отменить',
            yes: 'Удалить'
          },
          callback: confirm => {
            if (confirm) {
              this.delete(id)
            }
          }
      })
    },
  }
}
</script>