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
          th.text-left Фото
          th.text-left Имя пользователя
          th.text-left Дата регистрации
          th.text-left Статус
          th.text-left Галиреи
          th.text-left Фото
          th.text-left Заказы
          th.text-right Действия
      tbody
        tr(v-for="(user, index) in users", :key="")
          td
            v-avatar(size="28")
              v-img(:src="user.picture", alt="altText")
          td {{ user.name }}
          td {{ new Date(user.date) | dateFormat('DD.MM.YYYY') }}
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
          td.text-right
            v-btn(@click="authThisUser(user._id)", icon)
              v-icon mdi-account-arrow-left
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "AminPageUsers",
  layout: "admin",
  data: function () {return {
    users: null,
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
      }
    ]
  }},
  methods: {
    ...mapActions({
      signin: "Auth/signin",
    }),
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
        });
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