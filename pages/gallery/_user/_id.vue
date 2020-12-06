<template lang="pug">
.gallery(v-if="gallery")
  v-container
    .gallery__header
      h1.gallery__title {{ gallery.title }}
      h2.gallery__user {{ gallery.creator.name }}
    .gallery__description {{ gallery.description }}
    .gallery__price-wrapper
      .gallery__price {{ $t('public.gallery.price') }} {{ gallery.price }} грн
      .gallery__summ Сумма: {{ form.summ }} грн
    .gallery__content
      h3.gallery__content-title {{ $t('public.gallery.photosTitle') }}
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
            )
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
  v-divider
  v-container 
    .gallery__price-wrapper
      .gallery__price {{ $t('public.gallery.price') }} {{ gallery.price }} грн
      .gallery__summ Сумма: {{ form.summ }} грн
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
          ) {{ $t('buttons.placing') }}
        v-card
          v-card-title
            span.headline {{ $t('forms.placingOrder.title') }}
          v-form( v-model="valid" ref="form" )
            v-card-text
              v-container
                v-row
                  v-col(
                    cols="12"
                    sm="6"
                  )
                    v-text-field(
                      :label="$t('forms.placingOrder.name')"
                      v-model="form.name"
                      required
                      :rules="nameRules"
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
                      label="E-mail*"
                      v-model="form.email"
                      required
                      :rules="emailRules"
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
                strong( v-else ).green--text {{ order.length }} {{ $t('forms.placingOrder.pgotos') }}
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
    addOrder: function () {
      this.$refs.form.validate()
      if (!this.valid) return '' 
      const form = {
        ...this.form,
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
        this.dialog = false
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