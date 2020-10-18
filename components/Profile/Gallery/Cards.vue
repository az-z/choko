<template lang="pug">
v-row(v-if="galleries && galleries.length > 0")
  v-col(
    xs="12" sm="6" lg="4" xl="3"
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
        .subtitle-1 {{ gallery.price }} грн
        div {{ gallery.description }}
      v-card-actions
        v-btn(
          color="deep-purple lighten-2"
          text
          :to="`/profile/gallery/change/${gallery._id}`"                                                                                                                                        
          nuxt 
        ) Изменить
.overline(v-else) Нет галерей
</template>
<script>
export default {
  props: {
    galleries: {
      type: Array,
      required: false
    }
  }
}
</script>