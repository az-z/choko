<template lang="pug">
v-menu( offset-y )
  template( v-slot:activator="{ on, attrs }" )
    v-btn(
      color="white"
      outlined
      small
      elevation="0"
      v-bind="attrs"
      v-on="on"
    ) {{ $i18n.locale  }} 
  v-list( dense )
    v-list-item(
      v-for="locale in availableLocales" :key="locale.code"
      :to="switchLocalePath(locale.code)"
    ) {{ locale.name }}
</template>
<script>
export default {
  computed: {
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  }
}
</script>