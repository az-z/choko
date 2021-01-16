<template lang="pug">
v-card(color="light")
  v-card-text.py-0
    v-row
      v-col.py-2(cols="auto" lg="2")
        span {{ $t('galleries.statistics.allGalleries') }}
        strong( v-if="galleries && galleries.length" )  {{ galleries.length }}
        strong( v-else )  0
      v-col.py-2(cols="auto" lg="4")
        span Хранилище:
        strong  {{ user.storage.limit | formatStorage }}
        span.ml-4 Занято:
        strong  {{ user.storage.usage | formatStorage }}
      v-col( md="12" lg="6" ).py-2
        v-progress-linear(
          :value="(100 / user.storage.limit) * user.storage.usage",
          height="22px"
          :color="returnColor((100 / user.storage.limit) * user.storage.usage)"
          rounded outlined 
        )
          template( v-slot:default="{ value }" )
            div.white--text
              span.ml-4 Сободно:
              span  {{ user.storage.limit - user.storage.usage | formatStorage }}
</v-card>
</template>
<script>
import { mapGetters } from "vuex"
export default {
  computed: {
    ...mapGetters({
      galleries: "Galleries/getGalleries",
      user: "Auth/getUser",
    }),
  },
  filters: {
    formatStorage: function formatBytes(bytes) {
      const decimals = 2
      if (bytes === 0) return "0 Bytes";

      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    },
  },
  methods: {
    returnColor: function (num) {
      if (num > 85) return 'error'
      if (num > 45) return 'warning'
      return 'success'
    }
  }
};
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