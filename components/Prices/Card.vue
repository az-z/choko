<template lang="pug">
.card
  .card__title {{ card.title }}
  .card__price(
    :class="`text-${card.price.color}`"
  )
    span {{ card.price.num }}
    span грн
  .card__description(
    v-html="card.html"
  )
  button.card__button(
    :class="`btn-outline-${card.button.color}`"
    @click="auth"
    ).btn {{ card.button.text }}
</template>
<script>
import MixinAuth from '~/mixins/auth'
export default {
  mixins: [MixinAuth],
  props: ['card']
}
</script>
<style lang="scss" scoped>
@mixin block {
  padding: 1rem;
  text-align: center;
}

.card {
  background-color: map-get($mainColors, light);
  margin: 2rem 0;
  border-radius: 16px;
  box-shadow: 0 0 32px rgba($color: #000000, $alpha: .15);
  &__title {
    @include block;
    font-weight: 500;
    font-size: 1.5rem;
    border-bottom: 1px solid #d9d9d9;
  }
  &__price {
    @include block;
    font-size: 3rem;
    padding: 2rem;
    border-bottom: 1px solid #d9d9d9;
  }
  &__description {
    @include block;
    border-bottom: 1px solid #d9d9d9;
  }
  &__button {
    @include block;
    margin: .5rem auto;
  }
}
</style>