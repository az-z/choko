<template lang="pug">
.index-page
  Baner
  Opportunities
  Prices
</template>
<script>
import Baner from '~/components/Banner'
import Opportunities from '~/components/Opportunities'
import Prices from '~/components/Prices'
export default {
  layout: 'indexPage',
  components: {
    Baner,
    Opportunities,
    Prices,
  }
}
</script>