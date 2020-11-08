<template lang="pug">
v-footer(
  color="primary lighten-1"
  padless
)
  v-row(
    justify="center"
    no-gutters
  )
    v-btn(
      v-for="link in links" :key="link"
      color="white"
      text
      rounded
      class="my-2"
    ) {{ link }}
    v-col(
      class="grey darken-2 py-4 text-center white--text"
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