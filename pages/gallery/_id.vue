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
      v-dialog(
        v-model="dialog"
        persistent
        max-width="600px" 
      )
        template( v-slot:activator="{ on, attrs }" )
          v-btn(
            color="green"
            large
            class="white--text"
            v-bind="attrs"
            v-on="on"
          ) Заказать
        v-card
          v-card-title
            span.headline Заполните данные для заказа
          v-card-text
            v-container
              v-row
                v-col(
                  cols="12"
                  sm="6"
                )
                  v-text-field(
                    label="Ваше имя*"
                    v-model="form.name"
                    required
                  )
                v-col(
                  cols="12"
                  sm="6"
                )
                  v-text-field(
                    label="Ваша фамилия"
                    v-model="form.lastname"
                  )
                v-col(
                  cols="12"
                )
                  v-text-field(
                    label="Ваш e-mail"
                    v-model="form.email"
                    required
                  )
                v-col(
                  cols="12"
                )
                  v-text-field(
                    label="Ваш номер телефона"
                    v-model="form.phone"
                    required
                  )
                //- v-col(
                  cols="12"
                //- )
                  v-select(
                    :items="['0-17', '18-29', '30-54', '54+']"
                    label="Age*"
                    required
                  )
            samll После оформления и оплаты заказ вам прейдет ссылка на орегеналы фотографий
          v-card-actions
            v-spacer
            v-btn(
              color="blue darken-1"
              text
              @click="dialog = false"
            ) Закрыть
            v-btn(
              color="blue darken-1"
              text
              @click="addOrder"
            ) Оформить заказ
</template>
<script>
export default {
  layout: 'public',
  data: function () {return{
    gallery: null,
    dialog: false,
    order: [],
    form: {
      name: null,
      lastname: null,
      email: null,
      phone: null,
      summ: null
    }
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