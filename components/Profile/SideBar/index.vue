<template lang="pug">
.sidebar
  //- .sidebar__logo Photo
  .sidebar__user-wrapper(v-if="user")
    .sidebar__user
      img(:src="user.picture").sidebar__img
    .sidebar__user-name {{ user.name }}
    .sidebar__user-email {{ user.email }}
    .sidebar__active Активен
  ul.sidebar__link-list
    li.sidebar__element
      nuxt-link(
        :to="'/profile/user'"
      ) Пользователь
    li.sidebar__element
      nuxt-link(
        :to="'/profile/gallery'"
      ) Галерея
    li.sidebar__element
      nuxt-link(
        :to="'/profile/user'"
      ) Настройки 
    li.sidebar__element
      button(
        @click="logout"
      ).btn.btn-outline-main-1 Выход  
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
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
  },
  methods: {
    ...mapActions({
      signout: 'Auth/signout'
    }),
    logout: async function () {
      await this.$gAuth.signOut()
      this.signout()
      this.$router.push('/')
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
  &__active {
    background-color: map-get($mainColors, main-2);
    color: #fff;
    font-size: map-get($fontSizes, small);
    width: fit-content;
    margin: 0 auto;
    border-radius: 16px;
    padding: 0 .5rem;
    margin-top: map-get($indents, middle);
  }
  &__element {
    list-style: none;
    margin: 0;
    display: flex;
    justify-content: center;
    background-image: url(/static/images/Profile-folders/1.png);
    a {
      position: relative;
      z-index: 5;
      display: block;
      width: 100%;
      color: map-get($mainColors, light);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      display: block;
      height: 32px;
      text-align: center;
      &:hover {
        text-decoration: underline;
      }
      &.active-link {
        text-decoration: underline;
        // color: map-get($mainColors, black) !important;
        // &::before {
        //   content: '';
        //   display: block;
        //   position: absolute;
        //   top: -8px;
        //   left: 8px;
        //   z-index: 4;
        //   height: 48px;
        //   background-color: map-get($mainColors, white);
        //   width: 100%;
        //   border-radius: 16px 0 0 16px;
        // } 
      }
    }   
    &:not(:first-child) {
      margin-top: 1rem;
    }
  }
}
</style>