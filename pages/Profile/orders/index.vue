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
          td 
            div {{ order.name }} {{ order.lastname }}
            small.greay--text {{ order.email }}
          td
            Detail(
              :order="order"
              :updateOrders="updateOrders"
            )
            v-menu(
              bottom left offset-y
            )
              template(
                v-slot:activator="{ on, attrs }"
              )
                v-btn(
                  icon
                  v-bind="attrs"
                  v-on="on"
                )
                  v-icon mdi-dots-vertical
              v-list
                v-subheader Быстрые действия
                v-list-item(
                  @click="removeOrder(order._id)"
                )
                  v-list-item-icon
                    v-icon(
                      color="red"
                    ) mdi-delete
                  v-list-item-content Удалить заказ
.overline(v-else) Нет заказов
</template>
<script>
import Detail from '~/components/Orders/Detail'
export default {
  name: 'orders',
  components: {
    Detail
  },
  data: function () {return{
    orders: null
  }},
  methods: {
    removeOrder: async function (id) {
      try {
        const response = await this.$axios.$delete(`order/remove/${id}`)
        this.$notify({
          group: 'foo',
          type: 'success',
          title: 'System',
          text: response.msg
        })
        this.updateOrders()
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
    updateOrders: function () {
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
  },
  mounted: function () {
    this.updateOrders()
  }
}
</script>
<style lang="scss" scoped></style>
