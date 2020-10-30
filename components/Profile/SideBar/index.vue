<template lang="pug">
.sidebar
  v-navigation-drawer(
    v-model="drawer"
    :mini-variant="miniVariant"
    :clipped="clipped"
    permanent
    app
  )
    v-list
      v-list-item.px-2
        v-list-item-avatar
          v-img(:src="user.picture")
      v-list-item(
        link
        to="/profile/user"
        router
        exact
        nuxt
      )
        v-list-item-content
          v-list-item-title.title {{ user.name }}
          v-list-item-subtitle {{ user.email }}
    v-divider
    v-list(
      nav
      dense
    )
      v-list-item(link to="/profile/gallery" nuxt)
        v-list-item-icon
          v-icon.mr-1 mdi-image-multiple
          v-list-item-title Галереи
      v-list-item(link to="/profile/orders" nuxt)
        v-list-item-icon
          v-icon.mr-1 mdi-cash-register
          v-list-item-title Заказы
    template(v-slot:append)
      v-list(
        nav
        dance
      )
        v-list-item(@click="logout")
          v-list-item-icon
            v-icon.mr-1 mdi-exit-to-app
            v-list-item-title Выход
  v-app-bar(
    :clipped-left="clipped"
    dark
    app
  )
    //- v-app-bar-nav-icon(@click.stop="drawer = !drawer")
    v-btn(
      icon
      @click.stop="miniVariant = !miniVariant"
    )
      v-icon mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}
    v-btn(
      icon
      @click.stop="clipped = !clipped"
    )
      v-icon mdi-application
    //- v-btn(
      icon
      @click.stop="fixed = !fixed")
        v-icon mdi-minus
    //- v-toolbar-title(v-text="title")
    v-spacer
    v-btn(
      icon
      @click.stop="rightDrawer = !rightDrawer"
    )
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data: () => ({
    clipped: true,
    miniVariant: true,
    drawer: false
  }),
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
      this.$router.push('/')
      this.signout()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>