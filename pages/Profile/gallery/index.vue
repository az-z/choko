<template lang="pug">
.gallery
  h1.gallery__title Галереи
  .gallery__folders
    img(
      v-for="index in 10" :key="index"
      :src="`/images/Profile-folders/${index}.png`"
    ).gallery__img

</template>
<script>
export default {
  layout: 'profile'
}
</script>
<style lang="scss">
.gallery {
  &__folders {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1.5rem;
  }
  &__img {
    width: 100%;
  }
}
</style>