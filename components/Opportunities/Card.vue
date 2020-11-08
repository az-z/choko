<template lang="pug">
.card
  svg-icon(:name="icon" width="128px" height="150px").card__icon
  .card__content
    .card__title {{ title[$i18n.locale] }}
    .card__text {{ text[$i18n.locale] }} 
</template>
<script>
export default {
  name: 'OpportunitiesCard',
  props: ['icon', 'title', 'text']
}
</script>
<style lang="scss" scoped>
.card {
  display: flex;
  align-items: center;
  margin: 2rem auto;
  flex-wrap: wrap;
  padding: 1rem;
  // box-shadow: 0 0 4px rgba(0,0,0, .4);
  background-color: map-get($mainColors, white);

  &__icon {
    width: 100%;
    position: relative;
    display: block;
  }

  &__content {
    width: 100%;
    margin-left: auto;
  }

  &__title {
    margin-top: 2rem;
    font-size: 1.5rem;
    font-weight: 900;
    text-align: center;
  }
}
</style>