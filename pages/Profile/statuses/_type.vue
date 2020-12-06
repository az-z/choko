<template lang="pug">
v-container
  v-card( v-if="response" )
    v-card-title
      span( v-if="$route.params.type === 'month'" ) Месячная
      span( v-else ) Годовая
      span.ml-1 подписка
    v-card-text Вы оформляете подписку на месяц
    v-card-actions
      div( v-html="$route.params.type === 'month' ? response.first : response.second" )
</template>
<script>
export default {
  data: function () {return{
    response: null
  }},
  mounted: async function () {
    try {
      this.response = await this.$axios.$get('/user/statuses/getpayments')
    } catch (error) {
      console.error(error);
    }
  }
}
</script>