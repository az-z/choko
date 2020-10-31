<template lang="pug">
.public-order
  v-container( fluid )
    v-row(v-if="order")
      v-col(
        cols="12"
        md="4"
        lg="2"
        v-for="(image, index) in order.images" :key="index"
      )
        v-card
          v-img( height="200px" :src="image.path.original")
          v-card-actions
            v-btn(
              link nuxt text
              color="primary"
              block
              :href="image.path.original"
            ) Скачать
</template>
<script>
export default {
  name: 'PublicOrder',
  layout: 'public',
  data: function () {return{
    order: null
  }},
  methods: {
    getOrder: async function () {
      try {
        const response = await this.$axios.$get(`order/get-one/${this.$route.params.id}`)
        this.order = response.order
      } catch (error) {
        console.error(error)
        this.$notify({
          group: 'foo',
          type: 'error',
          title: 'System',
          text: error.response.data.msg
        })
      }
    }
  },
  mounted: function () {
    this.getOrder()
  }
}
</script>

<style lang="scss" scoped></style>
