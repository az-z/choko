<template lang="pug">
.orders(v-if="orders")
  v-container
    v-list(
      two-line
      subheader
    )
      v-list-item(
        v-for="(gallery, index) in galleries" :key="index"
        link
      )
        v-list-item-avatar(
          color="teal")
          v-img(
            v-if="gallery.images"
            :src="gallery.images[0].path.original")
          //- span( v-else class="white--text headline" ) {{ gallery.title.substr(0,1) }}
        v-list-item-content
          //- v-list-item-title(v-text="gallery.title")
          //- v-list-item-subtitle(v-text="gallery.price + 'грн'")
        v-list-item-content
          v-list-item-title(v-text="gallery.description")
        v-list-item-action
          //- input(
            id="link-to-copy"
            type="hidden"
            :value="`${pathLink}gallery/${gallery._id}`"
          //- )
          //- v-row
            v-btn(
              icon
              @click="copy"
            )
              v-icon(color="green") mdi-content-copy
            v-btn(
              icon
              :to="`/profile/gallery/change/${gallery._id}`"
            )
              v-icon(color="orange") mdi-cog
            v-btn(icon @click="remove(gallery.title, gallery._id)")
              v-icon(color="red") mdi-close-circle
.overline(v-else) Нет заказов

</template>
<script>
export default {
  name: 'orders',
  data: function () {return{
    orders: null
  }},
  mounted: function () {
    this.$axios.get('order/get-user-orders').then(response => {
      this.$notify({
        group: 'foo',
        type: 'success',
        title: 'System',
        text: response.data.msg
      })
      this.orders = response.data.orders
      this.$forceUpdate()
    }).catch(error => {
      this.$notify({
        group: 'foo',
        type: 'error',
        title: 'System',
        text: error.response.const.msg
      })
    })
  }
}
</script>
<style lang="scss" scoped></style>
