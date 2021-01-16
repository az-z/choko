<template lang="pug">
.gallery(v-if="gallery")
  v-dialog( v-model="showImage" )
    v-card
      v-img( 
        v-if="showImageItem" 
        :src="showImageItem.path.small"
      )
  v-container
    .gallery__header
      h1.gallery__title {{ gallery.title }}
      .gallery__price-wrapper
        .gallery__length.mr-4 {{ order.length }} фото в заказе
        .gallery__price {{ $t('public.gallery.price') }} {{ gallery.price }} грн
        .gallery__summ Сумма: {{ form.summ }} грн
      .gallery__actions
        v-container
          v-dialog(
            v-model="dialog"
            persistent
            max-width="600px" 
          )
            template( v-slot:activator="{ on, attrs }" )
              v-btn(
                color="green"
                class="white--text"
                v-bind="attrs"
                v-on="on"
              ) {{ $t('buttons.placing') }}
            v-card( v-if="htmlPayment" )
              v-card-title Оплатить онлайн
              v-card-text
                div(v-html="htmlPayment" )
            v-card( v-else-if="gallery.payment === 'cash' && payed" )
              v-card-title Спасибо за заказ
              v-card-text {{ gallery.creator.payment.cashText }}
              v-card-actions
                v-spacer
                v-btn(
                  color="blue darken-1"
                  text
                  @click="dialog = false; payed = false"
                ) {{ $t('buttons.close') }}
            v-card( v-else )
              v-card-title
                span.headline {{ $t('forms.placingOrder.title') }}
              v-form( v-model="valid" ref="form" )
                v-card-text
                  v-container
                    v-row
                      v-col(
                        cols="12"
                      )
                        v-text-field(
                          label="E-mail*"
                          v-model="form.email"
                          required
                          :rules="emailRules"
                        )
                      v-col(
                        cols="12"
                        sm="6"
                      )
                        v-text-field(
                          :label="$t('forms.placingOrder.name')"
                          v-model="form.name"
                        )
                      v-col(
                        cols="12"
                        sm="6"
                      )
                        v-text-field(
                          :label="$t('forms.placingOrder.lastName')"
                          v-model="form.lastname"
                        )
                      v-col(
                        cols="12"
                      )
                        v-text-field(
                          :label="$t('forms.placingOrder.phone')"
                          v-model="form.phone"
                          required
                          v-mask="'+38 (0##) ##-##-###'"
                        )
                  div
                    small {{ $t('forms.placingOrder.description') }}
                  div
                    div( v-if="order.length == 0" ).red--text {{ $t('forms.placingOrder.validate.length') }}
                    strong( v-else ).green--text {{ order.length }} {{ $t('forms.placingOrder.photos') }}
                v-card-actions
                  v-spacer
                  v-btn(
                    color="blue darken-1"
                    text
                    @click="dialog = false"
                  ) {{ $t('buttons.close') }}
                  v-btn(
                    color="blue darken-1"
                    text
                    :disabled="!order.length"
                    @click="addOrder"
                  ) {{ $t('buttons.placingOrder') }}
    .gallery__description {{ gallery.description }}
    .gallery__content
      //- h3.gallery__content-title {{ $t('public.gallery.photosTitle') }}
      v-row
        v-col(
          v-for="(image, index) in gallery.images" :key="index"
          cols="12"
          sm="6"
          md="3"
        )
          v-card
            v-img(
              :src="image.path.small"
              height="240" 
              @click="showModalImage(image)"
            )
            v-card-text {{ image.originalName }}
            v-card-actions
              v-btn(
                @click="pick(index)"
                :color="image.picked ? 'red' : 'green'"
                class="white--text"
                block
              )
                v-icon( left v-if="!image.picked" ) mdi-check
                span( v-if="!image.picked" ) {{ $t('buttons.add') }}
                v-icon( left v-show="image.picked" ) mdi-close
                span( v-if="image.picked" ) {{ $t('buttons.remove') }}
  //- .gallery__footer
v-container( v-else )
  .h2 {{ msg }}
</template>
<script>
export default {
  layout: 'public',
  data: function () {return{
    gallery: null,
    dialog: false,
    order: [],
    msg: null,
    showImage: false,
    showImageItem: null,
    form: {
      name: null,
      lastname: null,
      email: null,
      phone: null,
      summ: 0
    },
    valid: false,
    nameRules: [
      v => !!v || this.$t('forms.placingOrder.validate.nameReq')
    ],
    emailRules: [
      v => !!v || this.$t('forms.placingOrder.validate.emailReq'),
      v => /.+@.+\..+/.test(v) || this.$t('forms.placingOrder.validate.emailInvalid')
    ],
    htmlPayment: null,
    payed: false
  }},
  mounted: function () {
    this.$axios.get(`/gallery/get/public/${this.$route.params.id}`).then(response => {
      this.gallery = response.data.gallery
    }).catch(error => {
      this.msg = error.response.data.msg
    })
  },
  methods: {
    pick: function (index) {
      if( !this.gallery.images[index].picked ) this.order.push(this.gallery.images[index]._id)
      else this.order = this.order.filter(element => element !== this.gallery.images[index]._id)
      this.gallery.images[index].picked = !this.gallery.images[index].picked
      this.form.summ = this.gallery.price * this.order.length
      this.$forceUpdate()
    },
    showModalImage: function (image) {
      this.showImage = true
      this.showImageItem = image
    },
    addOrder: async function () {
      this.$refs.form.validate()
      if (!this.valid) return ''
      const form = {
        ...this.form,
        images: this.order,
        user: this.gallery.creator._id,
        gallery: this.$route.params.id
      }
      try {
        const response = await this.$axios.$post('order/create', form)
        if (this.gallery.payment === 'liqpay') {
          const payload = {
            orderId: response.order._id,
            summ: this.form.summ
          }
          const responseHtml = await this.$axios.$post('order/html', payload )
          this.htmlPayment = responseHtml.html
        }
        this.$notify({
          group: 'foo',
          type: 'success',
          title: 'System',
          text: response.msg
        })
        this.payed = true
      } catch (error) {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: 'System',
          text: error.response ? error.response.data.msg : 'Что-то пошло не так'
        })        
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.gallery {
  &__header {
    background-color: #fff;
    position: fixed;
    top: 64px;
    z-index: 10;
    left: 0; right: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 10px;
    border-bottom: 1px solid #d3d3d3;
  }
  &__user {
    margin-left: auto;
  }
  &__description {
    width: 100%;
    padding: .5rem;
    margin-top: 84px;
    margin-bottom: .5rem;
    border-radius: 20px;
    background-color: #fff;
  }
  &__price-wrapper {
    display: flex;
    margin-left: auto;
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