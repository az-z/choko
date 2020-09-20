<template lang="pug">
.one-gallery
  .one-gallery__header
    .one-gallery__title {{ gallery.title }}
    .one-gallery__change Редактировать
  .one-gallery__preview
    img(
      src="/images/photo.jpg"
    ).one-gallery__img
  .one-gallery__footer
    input(v-model="input").one-gallery__link
    button.one-gallery__button-copy
      svg-icon(name="paper" width="22px" height="22px")
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    gallery: {
      type: Object,
      required: true
    }
  },
  data: function () {return{
    input: null
  }},
  mounted: function () {
    this.input = `http://link.com/${this.gallery._id}`
  }
}
</script>
<style lang="scss" scoped>
.one-gallery {
  padding: 1rem;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 12px 12px 32px rgba(0,0,0,.2);
  &__footer {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__link {
    display: block;
    border: 1px solid map-get($mainColors, dark);
    border-right: none;
    border-radius: 4px 0 0 4px;
    height: 36px;
  }
  &__button-copy {
    border: 1px solid map-get($mainColors, dark);
    border-radius: 0 4px 4px 0;
    height: 36px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__img {
    width: 50%;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
  }
  &__header {
    display: flex;
    margin-bottom: map-get($indents, middle);
  }
  &__change {
    margin-left: auto;
    padding: 0 map-get($indents, small);
    border: 1px solid map-get($mainColors, orange);
    border-radius: 4px;
  }
}
</style>
