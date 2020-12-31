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
      ) {{ $t('footer.buttons.use_policy') }} 
      v-btn(
        color="white" 
        text
      ) {{ $t('footer.buttons.privacy_policy') }}  
      v-btn(
        color="white" 
        text
        nuxt
        to="/about"
      ) {{ $t('footer.buttons.about') }}  
      v-btn(
        color="white" 
        text
        nuxt
        to="/contacts"
      ) {{ $t('footer.buttons.contacts') }}  
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
