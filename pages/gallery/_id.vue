<template lang="pug">
.gallery(v-if="gallery")
  v-container
    .gallery__header
      h1.gallery__title {{ gallery.title }}
      h2.gallery__user {{ gallery.creator.name }}
    .gallery__description {{ gallery.description }}
    .gallery__price-wrapper
      .gallery__price Цена за фото: {{ gallery.price }} грн
      .gallery__summ {{ gallery.price * order.length }} грн  
    .gallery__content
      h3.gallery__content-title Фотографии
      v-row
        v-col(
          v-for="(image, index) in gallery.images" :key="index"
          sm="1"
          md="3"
        )
          v-card
            v-img(
              :src="image.path.small"
            )
            v-card-actions
              v-btn(
                @click="pick(index)"
                :color="image.picked ? 'red' : 'green'"
                class="white--text"
                block
              )
                v-icon( left v-if="!image.picked" ) mdi-check
                span( v-if="!image.picked" ) Добавить
                v-icon( left v-show="image.picked" ) mdi-close
                span( v-if="image.picked" ) Убрать
  .gallery__footer
    v-container
      v-btn(
        color="green"
        @click="addOrder"
      ) Заказать
</template>
<script>
export default {
  layout: 'public',
  data: function () {return{
    gallery: null,
    order: []
  }},
  mounted: function () {
    this.$axios.get(`/gallery/get/public/${this.$route.params.id}`).then(response => {
      this.gallery = response.data.gallery
    }).catch(error => console.error(error))
  },
  methods: {
    pick: function (index) {
      if( !this.gallery.images[index].picked ) this.order.push(this.gallery.images[index]._id)
      else this.order = this.order.filter(element => element !== this.gallery.images[index]._id)
      this.gallery.images[index].picked = !this.gallery.images[index].picked
      this.$forceUpdate()
    },
    addOrder: function () {
      const form = {
        images: this.order,
        user: this.gallery.creator._id,
        gallery: this.gallery._id
      }
      this.$axios.post('order/create', form).then(response => {
        this.$notify({
          group: 'foo',
          type: 'success',
          title: 'System',
          text: response.data.msg
        })
      }).catch(error => {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: 'System',
          text: error.response.data.msg
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.gallery {
  &__header {
    display: flex;
  }
  &__user {
    margin-left: auto;
  }
  &__description {
    padding: .5rem;
    margin-top: .5rem;
    margin-bottom: .5rem;
    border-radius: 20px;
    background-color: #fff;
  }
  &__price-wrapper {
    display: flex;
  }
  &__summ {
    margin-left: 32px;
    font-weight: bold;
  }
  &__footer {
    border-top: 1px solid #d3d3d3;
  }
}
</style>