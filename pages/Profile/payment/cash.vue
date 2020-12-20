<template lang="pug">
v-form( v-model="valid" )
  v-textarea(
    v-model="cashText"
    label="Текст который отобразится при оформлении заказа" 
  )
  v-btn( @click="save" color="success"  ) Сохранить
</template>
<script>
export default {
  data: function () {return{
    valid: false,
    user: this.$store.getters['Auth/getUser'],
    cashText: null
  }},
  methods: {
    save: async function () {
      try {
        const response = await this.$axios.$put('/user/changepaymentcashtext', { cashText : this.cashText })
        this.$notify({
          group: 'foo',
          type: 'success',
          title: 'System',
          text: response.msg
        })
      } catch (error) {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: 'System',
          text: error.response ? error.response.data.msg : 'Что-то пошло не так'
        })
        console.error(error)
      }
    }
  },
  mounted: function () {
    this.cashText = (this.user.payment.cashText)
  }
}
</script>