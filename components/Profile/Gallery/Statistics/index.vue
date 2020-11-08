<template lang="pug">
v-card(
  color="light"
)
  v-card-text(
    v-if="galleries && galleries.length > 0"
  ).font-weight-bold
    | {{ $t('galleries.statistics.allGalleries') }}
    | {{ galleries.length }}
</v-card>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      galleries: 'Galleries/getGalleries'
    })
  }
}
</script>