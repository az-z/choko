<template lang="pug">
v-card(
  color="light"
)
  v-card-text(
    v-if="galleries && galleries.length > 0"
  )
    v-row
      v-col( cols="auto" ).font-weight-bold
        | {{ $t('galleries.statistics.allGalleries') }}
        | {{ galleries.length }}
      v-col( cols="auto" )
        span Хранилище:
        span {{ user.storage.limit }}
        span.ml-4 Занято:
        span {{ user.storage.usage }}
      v-col
        .storage
          .storage__wrapper
          .storage__usage.success(
            :style="`width: ${100 / user.storage.limit * user.storage.usage }%`"
          )
</v-card>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      galleries: 'Galleries/getGalleries',
      user: 'Auth/getUser'
    })
  }
}
</script>
<style lang="scss" scoped>
.storage {
  position: relative;
  &__wrapper {
    height: 20px;
    width: 100%;
    border: 1px solid #d3d3d3;
  }
  &__usage {
    height: 18px;
    position: absolute;
    top: 1px;
    left: 1px;
  }
}
</style>