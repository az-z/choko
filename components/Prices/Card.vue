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
  .card__button
    nuxt-link(to="/auth" :class="`btn-outline-${card.button.color}`").btn {{ card.button.text }}
</template>
<script>
export default {
  props: ['card']
}
</script>
<style lang="scss" scoped>
@mixin block {
  padding: 1rem;
  text-align: center;
  border-bottom: 1px solid #d9d9d9;
}

.card {
  background-color: map-get($mainColors, light);
  margin: 2rem 0;
  &__title {
    @include block;
    font-weight: 500;
    font-size: 1.5rem;
  }

  &__price {
    @include block;
    font-size: 3rem;
    padding: 2rem;
  }

  &__description {
    @include block;
  }

  &__button {
    @include block;
  }
}
</style>