<template lang="pug">
.orders(v-if="orders && orders.length > 0")
  small Последние 10 заказов
  v-simple-table
    template( v-slot:default )
      thead
        tr
          th.text-left #
          th.text-left Превью
          th.text-left Статус 
          th.text-left Оформлен
          th.text-left Сумма(грн)
          th.text-left Заказчик
          th.text-left Действия
      tbody
        tr(
          v-for="(order, index) in orders" :key="index"
        )
          td
            strong {{ index + 1 }}
          td.pa-1
            v-avatar(
              :color="order.status ? 'primary' : 'warning'"
            )
              img(
                v-if="order.images[0]"
                :src="order.images[0].path.small"
              )
              span( v-else class="white--text"  ) Order
          td
            v-chip(
              :color="order.status ? 'green' : 'red'"
              class="white--text" 
            ) {{ order.status ? 'Оплачен' : 'Не оплачен' }}
          td {{ new Date(order.date) | dateFormat('DD.MM.YYYY')}}
          td {{ order.summ }}
          td {{ order.name }} {{ order.lastname }}
          td
            v-btn(
              icon
              small
            )
              v-icon(color="primary") mdi-open-in-app
            v-btn(
              icon
              small
            )
              v-icon(color="orange") mdi-cog
            v-btn(
              icon
              small
            )
              v-icon(color="red") mdi-delete
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
