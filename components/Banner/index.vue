<template lang="pug">
kinesis-container.baner.container#baner
  .baner__info-block
    .baner__title Работо с фото? Легко!
    .baner__desription Работо с фото? Легко!
    .baner__google
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
  background-image: url('/images/pririda-photo.jpg');
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
    width: 280px;
    height: 280px;
    background-color: map-get($mainColors, light);
    box-shadow: 0 0 32px rgba(0,0,0,.15);
    border-radius: 16px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__title {
    font-size: 1.2rem;
    color: map-get($mainColors, black);
    font-weight: 500;
  }
  &__description {

  }
  &__google {
    margin-top: auto;
  }
}
</style>