<template lang="pug">
.public-page(v-if="user")
  v-container
    v-row
      v-col(
        md="3"
      )
        v-card
          v-img(
            :src="user.picture"
            rounded
          )
      v-col
        v-card
          v-card-title {{ user.name }}
          v-card-text
            .subtitle {{ user.email }}
            div {{ user.description }}
          v-card-actions
            v-btn(
              :href="user.site"
              target="blank"
              nuxt
              color="primary darken-2" 
            ) {{ $t('public.profile.buttons.site') }}
            v-btn(
              color="blue"
              :href="`http://facebook.com/${user.facebook}`"
              target="blank" 
              nuxt
            )
              v-icon( color="white"  ) mdi-facebook
              span.white--text Facebook 
            v-btn(
              color="purple"
              :href="`http://instagram.com/${user.instagram}`"
              target="blank" 
              nuxt
            )
              v-icon( color="white"  ) mdi-instagram
              span.white--text Instagram
    v-row
      v-col(
        v-for="(gallery, index) in user.galleries" :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      )
        v-card(
          max-height="350px" 
          nuxt
          :to="`/gallery/${user.login}/${gallery._id}`"
        )
          v-img(
            :src="gallery.images[0] ? gallery.images[0].path.small : '/images/mo-img.jpg'" alt="altText"
            height="150px" 
          )
          v-card-title {{ gallery.title }}
          v-card-text
            .subtitle-1 {{ $t('public.profile.gallery.price') }} {{ gallery.price }} грн
            div {{ gallery.description }}
          v-card-actions
            v-btn(
              class="white--text"
              color="primary"  
            ) {{ $t('buttons.open') }}
.public-page-error(v-else)
  h1 {{ $t('public.profile.noUser') }}
</template>
<script>
export default {
  layout: 'public',
  data: () => ({
    user: null
  }),
  mounted: function () {
    this.$axios.get(`/auth/get-public-user/${this.$route.params.id}`).then(response => {
      this.user = response.data.user
    }).catch(error => console.error(error))
  }
}
</script>
<style lang="scss" scoped>
.public-page {
  &__header {
    display: flex;
  }
  &__info {
    margin-left: 20px;
  }
  &__img {
    width: 156px;
    height: 156px;
    border-radius: 20px;
  }
  &__galleries {
    background-color: map-get($mainColors, dark);
    color: #fff;
    margin-top: 30px;
  }
  &__gallery {
    background: #fff;
    padding: .5rem;
    color: map-get($mainColors, dark);
    border-bottom: 1px solid #d9d9d9;
    display: flex;
  }
  &__tit {
    padding: .5rem;
    font-size: 20px;
    font-weight: 600;
  }
  &__description {
    margin-left: 40px;
  }
}
</style>