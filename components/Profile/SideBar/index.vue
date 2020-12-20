<template lang="pug">
v-navigation-drawer(
  v-model="drawer"
  :mini-variant="miniVariant"
  clipped
  permanent
  app
)
  v-list(
    dense
  )
    v-list-item(
      to="/profile/user"
      nuxt
    ).px-2
      v-list-item-avatar
        v-img(:src="user.picture")
      v-list-item-content
        v-list-item-title.title {{ user.name }}
        v-list-item-subtitle {{ user.email }}
  v-divider
  v-list(
    nav
    dense
  )
    v-list-item(:to="localePath('/profile/gallery')" nuxt)
      v-list-item-icon
        v-icon.mr-1 mdi-image-multiple
      v-list-item-title {{ $t('sidebar.galleries') }}
    v-list-item(:to="localePath('/profile/orders')" nuxt)
      v-list-item-icon
        v-icon.mr-1 mdi-cash-register
      v-list-item-title {{ $t('sidebar.orders') }}
    v-list-item( :to="localePath('/profile/statuses')" nuxt )
      v-list-item-icon
        v-icon.mr-1 mdi-cash
      v-list-item-title {{ $t('sidebar.status') }}
    v-list-group(
      v-model="paymentGroup"
      prepend-icon="mdi-currency-usd" 
    )
      template( v-slot:activator )
        v-list-item-content
          v-list-item-title Тип оплаты
      v-list-item( class="pl-4"  :to="localePath('/profile/payment/cash')" nuxt )
        v-list-item-icon
          v-icon mdi-cash-100
        v-list-item-title Наличные
      v-list-item( class="pl-4"  :to="localePath('/profile/payment/liqpay')" nuxt )
        v-list-item-icon
          v-icon mdi-credit-card-outline
        v-list-item-title На карту
  template(v-slot:append)
    v-list(
      nav
      dance
    )
      v-list-item(@click="logout")
        v-list-item-icon
          v-icon.mr-1 mdi-exit-to-app
          v-list-item-title {{ $t('sidebar.exit') }}
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Logo from '~/components/NavigateBar/Logo'
export default {
  props: {
    miniVariant: {
      type: Boolean,
      required: true
    }
  },
  components: {
    Logo
  },
  data: () => ({
    drawer: false,
    paymentGroup: false
  }),
  computed: {
    ...mapGetters({
      user: 'Auth/getUser'
    }),
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