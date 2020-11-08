<template lang="pug">
kinesis-container.baner#baner
  v-parallax(
    src="/images/pririda-photo.jpg"
    :height="800" 
  )  
    v-container
      v-card.baner__info-block.text-center
        v-card-title {{ $t('landing.authBlock.title') }}
        v-card-text
          span {{ $t('landing.authBlock.subTitle') }}
          v-icon.ml-1 mdi-emoticon-wink-outline
        v-spacer
        v-card-actions
          GoogleAuth
      kinesis-element.baner__balloon
        img(src="/images/vs.png").baner__balloon-img
</template>
<script>
import GoogleAuth from '~/components/Auth/Socials/Google'
export default {
  components: {
    GoogleAuth
  }
}
</script>
<style lang="scss" scoped>
.baner {
  position: relative;
  height: 100vh;
  background-size: cover;
  &__balloon {
    position: absolute;
    top: 150px;
    right: 250px;
    width: 150px;
  }
  &__balloon-img {
    width: 100%;
    height: 100%;
  }
  &__info-block {
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translateY(-50%);
  }
  &__title {
    font-size: 1.2rem;
    color: map-get($mainColors, black);
    font-weight: 500;
  }
  &__google {
    margin-top: auto;
  }
}
</style>