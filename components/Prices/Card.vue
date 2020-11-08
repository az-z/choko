<template lang="pug">
v-card(
  elevation="2"
  :loading="loading"
  :disabled="loading"
)
  v-card-title(
    :class="`${card.price.color}--text`"
  ).justify-center {{ card.title[$i18n.locale] }}
  v-divider
  v-card-text
    .card__description(
      v-html="card.html[$i18n.locale]"
    )
    .mt-4.display-1.text-center(
      :class="`${card.color}--text`"
    )  {{ card.price.num }} грн
  v-divider
  v-card-actions
    v-btn(
      large
      block
      outlined
      :color="`${card.button.color} lighten-2`" 
      @click="click"
    ) {{ card.button.text }}
</template>
<script>
import MixinAuth from '~/mixins/auth'
export default {
  name: 'PriceCard',
  mixins: [MixinAuth],
  props: ['card'],
  data: function () {return{
    loading: false
  }},
  methods: {
    click: async function () {
      this.loading = true
      try {
        const response = await this.auth()
        this.loading = false
      } catch (error) {
        console.error(error)
        this.loading = false
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>