<template lang="pug">
v-card(elevation="2" )
  v-card-title(
    :class="`${card.price.color}--text`"
  ).justify-center {{ card.title }}
  v-card-text
    .my-4.subtitle-1 {{ card.price.num }} грн
    .card__description(
      v-html="card.html"
    )
  v-card-actions
    v-btn(
      large
      block
      :color="`${card.button.color} lighten-2`" 
      @click="auth"
    ) {{ card.button.text }}
</template>
<script>
import MixinAuth from '~/mixins/auth'
export default {
  name: 'PriceCard',
  mixins: [MixinAuth],
  props: ['card']
}
</script>
<style lang="scss" scoped></style>