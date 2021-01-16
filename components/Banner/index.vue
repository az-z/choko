<template lang="pug">
kinesis-container.baner#baner
  v-parallax(
    src="/images/pririda-photo.jpg"
    :height="800" 
  )
    v-container
      v-card.baner__info-block
        .text-center( v-if="!auth" )
          v-card-title {{ $t('landing.authBlock.title') }}
          v-card-text
            span {{ $t('landing.authBlock.subTitle') }}
            v-icon.ml-1 mdi-emoticon-wink-outline
          v-spacer
          v-card-actions
            GoogleAuth
        div( v-else )
          v-list-item.three-line
            v-list-item-content
              div( class="overline mb-4" ) Добро пожаловать
              v-list-item-title( class="headline mb-1"  ) {{ user.login }}
              v-list-item-subtitle {{ user.email }}
            v-list-item-avatar(
              size="80"
              color="primary"  
            )
              v-img( :src="user.picture" )
          v-card-actions
            v-btn(
              nuxt block
              to="/profile/user"
              color="primary"
            ) Профиль
      kinesis-element.baner__balloon
        img(src="/images/vs.png").baner__balloon-img
</template>
<script>
import { mapGetters } from 'vuex'
import GoogleAuth from '~/components/Auth/Socials/Google'
export default {
  name: "FirstScreenLanding",
  components: {
    GoogleAuth
  },
  computed: {
    ...mapGetters({
      auth: 'Auth/getSignin',
      user: 'Auth/getUser'
    })
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
    max-width: 360px;
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