<template lang="pug">
span
  v-tooltip( top )
    template( v-slot:activator="{ on, attrs }" )
      v-btn(
        icon
        small
        v-bind="attrs"
        v-on="on"
        @click="dialog = true"
      )
        v-icon(color="primary") mdi-open-in-app
    span Детальная настройка
  v-dialog(
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    scrollable
  )
    v-card( tile )
      v-toolbar(
        flat
        dark
        color="primary"
      )
        v-btn(
          icon
          dark
          @click="dialog = false"
        )
          v-icon mdi-close
        v-toolbar-title Редактирование заказа
        v-chip(
          :color="order.status ? 'green' : 'red'"
          class="white--text ml-2" 
        ) {{ order.status ? 'Оплачен' : 'Не оплачен' }}
        v-spacer
        v-toolbar-items
          v-btn(
            dark
            text
            @click="changeOrder"
          ) Сохранить
      v-card-title
        span Заказ id: {{ order._id }}
        input(
            :id="order._id"
            type="hidden"
            :value="`${pathLink}order/${order._id}`"
          )
        v-btn(
          icon
          @click="copy"
        )
          v-icon mdi-content-copy
      v-card-text
        v-row
          v-col(
            cols="12"
          )
            .subtitle-1 Заказ оформлен: {{ new Date(order.date) | dateFormat('DD.MM.YYYY') }}
          v-col(
            cols="12"
            sm="6"
            md="4"
          )
            v-card
              v-carousel(
                height="300"
              )
                v-carousel-item(
                  v-for="(slide, index) in order.images" :key="index"
                  :src="slide.path.original"
                  reverse-transition="fade-transition"
                  transition="fade-transition"
                )
            small {{ order.images.length }} фото, цена за фото: {{ order.summ / order.images.length }} грн
          v-col(
            cols="12"
            sm="6"
            md="8" 
          )
            v-form(
              v-model="valid"
              ref="form"
            )
              v-text-field(
                v-model="form.name"
                :rules="nameRules"
                label="Имя"
                required
              )
              v-text-field(
                v-model="form.lastname"
                label="Фамилия"
                required
              )
              v-text-field(
                v-model="form.email"
                label="E-mail"
                :rules="emailRules"
                required
              )
              v-text-field(
                v-model="form.phone"
                label="Номер телефона"
                required
                v-mask="'+38 (0##) ##-##-###'"
              )
              v-switch(
                v-model="form.status"
                label="Оплата"
                color="success"
              )
          v-col(
            cols="12"
          )
            strong Сумма заказа: {{ order.summ }} грн
</template>

<script>
export default {
  name: 'Detail',
  props: {
    order: {
      type: Object,
      required: true
    },
    updateOrders: {
      type: Function,
      required: true
    }
  },
  data: function () {return{
    dialog: false,
    valid: false,
    form: null,
    nameRules: [
      v => !!v || 'Name is required',
    ],
    emailRules: [
      v => !!v || 'E-mail обязателен',
      v => /.+@.+\..+/.test(v) || 'Введите коректный E-mail',
    ],
  }},
  computed: {
    pathLink: function () {
      return `${window.location.protocol}//${window.location.host}/`
    }
  },
  methods: {
    changeOrder: async function () {
      this.$refs.form.validate()
      if (!this.valid) return ''
      try {
        const reqBody = {
          name: this.form.name,
          lastname: this.form.lastname,
          phone: this.form.phone,
          email: this.form.email,
          status: this.form.status
        }
        const response = await this.$axios.$put(`order/change-order/${this.order._id}`, reqBody)
        this.$notify({
          group: 'foo',
          type: 'success',
          title: 'System',
          text: response.msg
        })
        this.updateOrders()
        this.dialog = false
      } catch (error) {
        console.error(error)
        this.$notify({
          group: 'foo',
          type: 'error',
          title: 'System',
          text: error.response ? error.response.data.msg : 'Что-то пошло не так'
        })
      }
    },
    copy: function () {
      const copyText = document.getElementById(this.order._id)
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
  },
  beforeMount: function () {
    this.form = { ...this.order }
  }
}
</script>

<style lang="scss" scoped></style>
