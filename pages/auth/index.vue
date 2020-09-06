<template lang="pug">
.auth.container
    h1.auth__title Авторизация
    AuthWindow
</template>
<script>
import AuthWindow from '~/components/Auth/AuthWindow'
export default {
  components: {
    AuthWindow
  }
}
</script>
<style lang="scss" scoped>
.auth {
  display: flex;
  flex-direction: column;
  align-items: center;
  // background-color: lighten(map-get($mainColors , google), 10);
  height: 100vh;

  &__title {
    margin-top: 4rem;
    margin-bottom: 4rem;
    // color: map-get($mainColors, white);
    // text-shadow: 0 0 2px darken(map-get($mainColors, google), 20);
  }
}
</style>