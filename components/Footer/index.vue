<template lang="pug">
v-footer(
  color="grey darken-2 "
  padless
  class="py-4 text-center white--text"
)
  v-row(
    justify="center"
    no-gutters
  )
    v-col
      v-btn(
        color="white" 
        text
      ) Условия эксплуатауии
      v-btn(
        color="white" 
        text
      ) Политика конфедициальности
      v-btn(
        color="white" 
        text
      ) О нас
      v-btn(
        color="white" 
        text
      ) Контакты
    v-col( cols="12" )
      v-btn(
        v-for="link in links" :key="link"
        color="white"
        text
        rounded
        class="my-2"
      ) {{ link }}
      v-col(
        cols="12"
      )
        span {{ new Date().getFullYear() }} —
        strong  VueMashins
</template>
<script>
export default {
  data: () => ({
    links: [],
  }),
}
</script>
<style lang="scss"></style>