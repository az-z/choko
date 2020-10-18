<template lang="pug">
.index-page
  NavigateBar
  Baner
  Opportunities
  Prices
  Footer
</template>
<script>
import NavigateBar from '~/components/NavigateBar'
import Baner from '~/components/Banner'
import Opportunities from '~/components/Opportunities'
import Prices from '~/components/Prices'
import Footer from '~/components/Footer'
export default {
  layout: 'indexPage',
  components: {
    Baner,
    Opportunities,
    Prices,
    NavigateBar,
    Footer
  },
}
</script>