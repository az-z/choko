<template lang="pug">
.error
  v-main( color="red lighten-5" )
    v-container
      v-flex
        v-alert(
          color="red"
          type="error"
        ) ERROR 404, Что то пошло не-так :( 10110101001 Бип-пиип
        v-spacer
        v-btn( link nuxt color="primary" to="/" ) На главную
</template>
<script>
export default {
  layout: 'public'
}
</script>