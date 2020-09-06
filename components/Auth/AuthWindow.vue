<template lang="pug">
.auth-window
  //- h3.auth-window__title Все 1 шаг
  GoogleAuth
</template>
<script>
import GoogleAuth from './Socials/Google'
export default {
  components: {
    GoogleAuth
  }
}
</script>
<style lang="scss" scoped>
.auth-window {
  width: 280px;
  height: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: map-get($mainColors, main-3);
  border-radius: 16px;

  &__title {
    color: map-get($mainColors, white);
    justify-self: flex-start;
  }
}
</style>
