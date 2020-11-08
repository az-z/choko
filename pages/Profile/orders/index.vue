<template lang="pug">
.orders(v-if="orders && orders.length > 0")
  small {{ $t('orders.smallInfo') }}
  v-simple-table
    template( v-slot:default )
      thead
        tr
          th.text-left #
          th.text-left {{ $t('orders.table.preview') }}
          th.text-left {{ $t('orders.table.status') }}
          th.text-left {{ $t('orders.table.date') }}
          th.text-left {{ $t('orders.table.summ') }}
          th.text-left {{ $t('orders.table.customer') }}
          th.text-right {{ $t('orders.table.actions') }}
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
              outlined
              class="white--text" 
            ) {{ order.status ? $t('orders.statuses.paid') : $t('orders.statuses.noPaid') }}
          td {{ new Date(order.date) | dateFormat('DD.MM.YYYY') }}
          td {{ order.summ }}
          td 
            div {{ order.name }} {{ order.lastname }}
            small.greay--text {{ order.email }}
          td.text-right
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
                v-subheader {{ $t('orders.fastActions.title') }}
                v-list-item(
                  @click="removeOrder(order._id)"
                )
                  v-list-item-icon
                    v-icon(
                      color="red"
                    ) mdi-delete
                  v-list-item-content {{ $t('orders.buttons.remove') }}
.overline(v-else) {{ $t('orders.noItems') }}
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
