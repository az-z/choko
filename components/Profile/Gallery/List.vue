<template lang="pug">
v-list(
  two-line
  subheader
  v-if="galleries && galleries.length > 0"
)
  v-list-item(
    v-for="(gallery, index) in galleries" :key="index"
    :to="`/profile/gallery/change/${gallery._id}`"
    nuxt
  )
    v-list-item-avatar(
      color="teal"
    )
      v-img(
        v-if="gallery.images"
        :src="gallery.images[0].path.original"
      )
      span( v-else class="white--text headline" ) {{ gallery.title.substr(0,1) }}
    v-list-item-content
      v-list-item-title(v-text="gallery.title")
      v-list-item-subtitle(v-text="gallery.price + 'грн'")
    v-list-item-content
      v-list-item-title(v-text="gallery.description")
    v-list-item-action
      input(
        :id="`link-to-copy-${index}`"
        type="hidden"
        :value="`${pathLink}gallery/${user.login}/${gallery._id}`"
      )
      v-row
        v-btn(
          icon
          @click.prevent="copy(index)"
        )
          v-icon(color="green") mdi-content-copy
        v-btn(
          icon
          :to="`/profile/gallery/change/${gallery._id}`"
        )
          v-icon(color="orange") mdi-cog
        v-btn(icon @click.prevent="remove(gallery.title, gallery._id)")
          v-icon(color="red") mdi-close-circle
.overline(v-else) Нет галерей
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    galleries: {
      type: Array,
      required: true
    }
  },
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
    copy: function (index) {
      const copyText = document.getElementById(`link-to-copy-${index}`)
      copyText.type = 'text'
      copyText.select()
      copyText.setSelectionRange(0, 99999)
      document.execCommand("copy")
      copyText.type = 'hidden'
      this.$notify({
        title: 'System',
        text: 'Ссылка добавлена в буфер обмена',
        group: 'foo',
        type: 'success'
      })
    }
  }
}
</script>