<template lang="pug">
v-container( fluid )
  v-card
    v-card-text
      v-row
        v-col
          v-card-title Фотографы
        v-spacer
        v-col(
          lg="2" 
        )
          v-select(
            :items="selectItems"
            v-model="timeInterval"
            label="Периуд"
            item-text="title"
            item-value="val"
            solo
            dense
            @change="fetchUSers"
          )
  v-simple-table
    template( v-slot:default )
      thead
        tr
          //- th.text-left Фото
          th.text-left Email
          //- th.text-left Дата регистрации
          th.text-left Статус
          th.text-left Галиреи
          th.text-left Фото
          th.text-left Заказы
          th.text-left Оплачено
          th.text-right Действия
      tbody
        tr(
          v-for="(user, index) in users", :key=""
        )
          //- td
            v-avatar(size="28")
              v-img(:src="user.picture", alt="altText")
          td(
            style="cursor: pointer;"
            @click.stop="authThisUser(user._id)"
          ) {{ user.email }}
          //- td {{ new Date(user.date) | dateFormat('DD.MM.YYYY') }}
          td
            v-chip(
              :color="user.active.status ? 'success' : 'error'"
            )
              span( v-if="user.active.status && !user.active.trial" ) Активен
              span( v-if="user.active.status && user.active.trial" ) Триал
              span( v-if="!user.active.status" ) Не активен
          td {{ user.galleries.length }}
          td {{ user.images.length }}
          td {{ user.orders.length }}
          td
            span {{ checkOrders(user.orders).length }}
            strong.ml-2 {{ allSums(user.orders) }}грн
          td.text-right
            v-menu( bottom left offset-y )
              template( v-slot:activator="{ on, attrs }" )
                v-btn( icon v-bind="attrs" v-on="on" )
                  v-icon mdi-dots-vertical
              v-list
                v-dialog( v-model="dialog" width="500" )
                  template( v-slot:activator="{ on, attrs }" )
                    v-list-item( @click="changeStatusElement(user)" v-bind="attrs" v-on="on" )
                      v-list-item-icon
                        v-icon mdi-calendar-range
                      v-list-item-content Статус
                  v-card
                    v-card-title Статус {{ user.name }}
                    v-card-text
                      v-row
                        v-col
                          v-chip(
                            :color="user.active.status ? 'success' : 'error'"
                          )
                            span( v-if="user.active.status" ) Активен
                            span( v-if="!user.active.status" ) Не активен
                        v-col
                          v-switch( v-model="status.active" )
                      v-date-picker( v-model="status.date" )
                    v-card-actions
                      v-btn( color="primary" @click="saveStatus(user._id)" ) Сохранить
                v-list-item
                  v-list-item-icon
                    v-icon( color="red" ) mdi-delete
                  v-list-item-content Удалить
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "AminPageUsers",
  layout: "admin",
  data: function () {return {
    users: null,
    dialog: false,
    status: {
      date: new Date().toISOString().substr(0, 10),
      active: false
    },
    timeInterval: 'month',
    selectItems: [
      {
        title: 'Весь периуд',
        val: 'all' 
      },
      {
        title: 'За месяц',
        val: 'month'
      },
      {
        title: 'За неделю',
        val: 'week'
      },
      {
        title: 'День',
        val: 'day'
      }
    ]
  }},
  computed: {
    // paymentsOrders: function () {
    //   const paymentsOrders = this.users.orders.map(element => element.status)
    //   return paymentsOrders
    // }
  },
  methods: {
    ...mapActions({
      signin: "Auth/signin",
    }),
    saveStatus: async function (id) {
      try {
        const response = await this.$axios.$put(`/admin/user/change/status/${id}`, this.status)
        this.$notify({
          group: 'foo',
          type: 'success',
          title: 'System',
          text: response.msg
        })
        this.fetchUSers()
      } catch (error) {
        this.$notify({
          group: "foo",
          type: "error",
          title: "System",
          text: error.response
            ? error.response.data.msg
            : "Что-то пошло не так",
        })
      }
    },
    checkOrders: function (orders) {
      const paymentsOrders = orders.filter(element => element.status)
      return paymentsOrders
    },
    changeStatusElement: function (user) {
      this.status.active = user.active.status
      this.status.date = new Date(user.active.to).toISOString().substr(0, 10)
    },
    allSums: function (orders) {
      let summs = null
      orders.forEach(element => summs = summs + element.status ? element.summ : 0)
      return summs
    },
    authThisUser: async function (id) {
      try {
        const response = await this.$axios.$get(`/admin/authwithuser/${id}`);
        localStorage.setItem("token", response.token);
        this.signin(response.user);
        this.$router.push("/profile/user");
      } catch (error) {
        this.$notify({
          group: "foo",
          type: "error",
          title: "System",
          text: error.response
            ? error.response.data.msg
            : "Что-то пошло не так",
        })
      }
    },
    fetchUSers: async function () {
      try {
        const usersResponse = await this.$axios.$get(`/admin/users/get/all?period=${this.timeInterval}`);
        this.users = usersResponse.users;
        this.$notify({
          group: "foo",
          type: "success",
          title: "System",
          text: usersResponse.msg,
        });
      } catch (error) {
        this.$notify({
          group: "foo",
          type: "error",
          title: "System",
          text: error.response ? error.response.data.msg : "Что-то пошло не так",
        })
      }
    }
  },
  created: async function () {
    this.fetchUSers()
  }
}
</script>