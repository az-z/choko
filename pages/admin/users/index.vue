<template lang="pug">
v-container( fluid )
    v-simple-table
      template( v-slot:default )
        thead
          tr
            th.text-left Фото
            th.text-left Имя пользователя
            th.text-left Дата регистрации
            th.text-left Галиреи
            th.text-left Фото
            th.text-left Заказы
            th.text-right Действия
        tbody
          tr(
            v-for="(user, index) in users" :key=""
          )
            td
              v-avatar(size="28")
                v-img(:src="user.picture" alt="altText")
            td {{ user.name }}
            td {{ new Date(user.date) | dateFormat('DD.MM.YYYY') }}
            td {{ user.galleries.length }}
            td {{ user.images.length }}
            td {{ user.orders.length }}
            td.text-right
              v-btn( icon )
                v-icon mdi-check
</template>
<script>
export default {
  name: 'AminPageUsers',
  layout: 'admin',
  data: function () {return{
    users: null
  }},
  beforeCreate: async function () {
    try {
      const usersResponse = await this.$axios.$get('/admin/users/get/all')
      this.users = usersResponse.users
      this.$notify({
        group: 'foo',
        type: 'success',
        title: 'System',
        text: usersResponse.msg
      })
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
</script>