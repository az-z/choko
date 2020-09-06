<template lang="pug">
.baner.container
  //- .baner__content
  h1.baner__title ФотоКлюч: автоматизация продаж ваших фотографий
  p.baner__text Работаете фотографом в детских садах, школах или на массовых мероприятиях?
  .baner__links
    nuxt-link(to="/auth").btn.btn-main-2 Регистрация
    nuxt-link(to="/auth").btn.btn-white Вход
</template>
<style lang="scss" scoped>
.baner {
  background: linear-gradient(0.25turn, map-get($mainColors, main-3), map-get($mainColors, main-1));
  color: map-get($mainColors, white);
  padding-top: 8rem !important;
  text-align: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &__title {
    font-size: 2rem;
    line-height: 3rem;
  }

  &__text {
    margin: 2rem 0;
  }

  &__links {
    display: flex;

    .btn {
      margin: 0 auto;
    }
  }
}
</style>