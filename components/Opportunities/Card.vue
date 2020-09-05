<template lang="pug">
.card
  svg-icon(:name="icon").card__icon
  .card__content
    .card__title {{ title }}
    .card__text {{ text }} 
</template>
<script>
export default {
  props: ['icon', 'title', 'text']
}
</script>
<style lang="scss" scoped>
.card {
  display: flex;
  align-items: flex-start;
  margin: 2rem auto;
  &__icon {
    width: 26%;
    position: relative;
    display: block;
  }

  &__content {
    width: 66%;
    margin-left: auto;
  }

  &__title {
    font-size: 1.5rem;
    font-weight: 900;
  }

  &__text {
  }
}
</style>