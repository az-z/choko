<template lang="pug">
.sidebar
  //- .sidebar__logo Photo
  .sidebar__user-wrapper(v-if="user")
    .sidebar__user
      img(:src="user.picture").sidebar__img
    .sidebar__user-name {{ user.name }}
    .sidebar__user-email {{ user.email }}
  ul.sidebar__link-list
    li.sidebar__element
      nuxt-link(
        :to="'/profile/user'"
      ) Пользователь
    li.sidebar__element
      nuxt-link(
        :to="'/profile/user'"
      ) Галерея
    li.sidebar__element
      nuxt-link(
        :to="'/profile/user'"
      ) Настройки
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      user: 'Auth/getUser'
    }),
    isRouteActive: function() {
      if (this.$nuxt.$route.path=="/") {
        return true;
      } else {
        return false;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__user {
    width: 96px;
    height: 96px;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 0 32px rgba(0,0,0, .2);
    margin: 0 auto;
  }
  &__user-wrapper {
    margin-top: 56px;
    margin-bottom: 36px;
    width: 100%;
    text-align: center;
    // display: flex;
  }
  &__user-name {
    font-weight: 600;
    color: map-get($mainColors, light);
  }
  &__user-email {
    line-height: .9rem;
    font-size: .8rem;
  }
  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &__icon {
    width: 32px;
    height: 32px;
  }
  &__link-list {
    width: 100%;
  }
  &__element {
    list-style: none;
    margin: 0;
    display: flex;
    justify-content: center;
    a {
      display: block;
      width: 110px;
      color: map-get($mainColors, light);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      display: block;
      height: 32px;
      &:hover {
        text-decoration: underline;
      }
    }   
    &:not(:first-child) {
      margin-top: 1rem;
    }
  }
}
</style>