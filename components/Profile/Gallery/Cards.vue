<template lang="pug">
v-row(v-if="galleries && galleries.length > 0")
  v-col(
    cols="12" md="6" lg="4" xl="3"
    v-for="(gallery, index) in galleries" :key="index"
  )
    v-card
      v-carousel(
        height="300"
      )
        v-carousel-item(
          v-for="(slide, index) in gallery.images" :key="index"
          :src="slide.path.small"
          reverse-transition="fade-transition"
          transition="fade-transition"
        )
      v-card-title {{ gallery.title }}
      v-card-text
        .subtitle-1 {{ gallery.price }} {{ $t('profile.gallery.currency') }} 
        div {{ gallery.description }}
      v-card-actions
        input(
          :id="`link-to-copy-${index}`"
          type="hidden"
          :value="`${pathLink}gallery/${user.login}/${gallery._id}`"
        )
        v-btn(
          color="green"
          text
          :to="localePath(`/profile/gallery/change/${gallery._id}`)"                                                                                                                                        
          nuxt 
        ) {{ $t('buttons.change') }}
        v-btn(
          color="orange"
          text
          nuxt
          @click="copy(index)"
        ) {{ $t('buttons.link') }}
.overline(v-else) {{ $t('profile.gallery.no_gallery_msg') }}
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    galleries: {
      type: Array,
      required: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'Auth/getUser'
    }),
    pathLink: function () {
      return `${window.location.protocol}//${window.location.host}/`
    }
  },
  methods: {
    copy: function (index) {
      const copyText = document.getElementById(`link-to-copy-${index}`)
      copyText.type = 'text'
      copyText.select()
      copyText.setSelectionRange(0, 99999)
      document.execCommand("copy")
      copyText.type = 'hidden'
      this.$notify({
        title: 'System',
        text: `{{ $t('msg.URLadded' }}`,
        group: 'foo',
        type: 'success'
      })
    }
  }
}
</script>
