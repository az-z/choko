<template lang="pug">
.index-page
  NavigateBar
  Baner
  Opportunities
  Prices
</template>
<script>
import NavigateBar from '~/components/NavigateBar'
import Baner from '~/components/Banner'
import Opportunities from '~/components/Opportunities'
import Prices from '~/components/Prices'
export default {
  components: {
    Baner,
    Opportunities,
    Prices,
    NavigateBar
  },
  middleware: 'checkAuth'
}
</script>