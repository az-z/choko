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
        v-icon mdi-open-in-app
    span {{ $t('orders.modal.tooltip') }}
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
        v-toolbar-title {{ $t('orders.modal.title') }}
        v-chip(
          :color="order.status ? 'green' : 'red'"
          class="white--text ml-2" 
        ) {{ order.status ? $t('orders.statuses.paid') : $t('orders.statuses.noPaid') }}
        v-spacer
        v-toolbar-items
          v-btn(
            dark
            text
            @click="changeOrder"
          ) {{ $t('buttons.save') }}
      v-card-title
        span {{ $t('orders.modal.orderId') }} {{ order._id }}
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
            .subtitle-1 {{ $t('orders.modal.date') }} {{ new Date(order.date) | dateFormat('DD.MM.YYYY') }}
            v-col(
            cols="12" 
          )
            v-form(
              v-model="valid"
              ref="form"
            )
              v-text-field(
                v-model="form.name"
                :label="$t('forms.orders.name')"
                required
              )
              v-text-field(
                v-model="form.lastname"
                :label="$t('forms.orders.lastName')"
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
                :label="$t('forms.orders.phone')"
                required
                v-mask="'+38 (0##) ##-##-###'"
              )
              v-switch(
                v-model="form.status"
                :label="$t('forms.orders.paid')"
                color="success"
              )
          v-col(
            cols="12"
          )
            strong {{ $t('orders.modal.summ') }} {{ order.summ }} {{ $t('orders.currency') }} 
          v-col( cols="12" )
            v-btn( nuxt :href="`${pathLink}gallery/${user.login}/${this.order.gallery}`" target="_blank" ) {{ $t('galleries.title') }} 
          v-col(
            v-for="(image, index) in order.images" :key="index"
            cols="12" md="2"
          )
            v-card
              v-img( height="200px"  :src="image.path.original" )
              v-card-text {{ image.originalName }}
</template>
<script>
import { mapGetters } from 'vuex'
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
      v => !!v || this.$t('orders.rules.name'),
    ],
    emailRules: [
      v => !!v || this.$t('orders.rules.email'),
      v => /.+@.+\..+/.test(v) || this.$t('orders.rules.incorrectEmail'),
    ],
  }},
  computed: {
    ...mapGetters({
      user: 'Auth/getUser'
    }),
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
          text: error.response ? error.response.data.msg : this.$t('msg.error') 
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
        text: this.$t('msg.URLadded'),
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
