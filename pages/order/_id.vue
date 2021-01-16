<template lang="pug">
.public-order
  v-container( fluid )
    v-row(v-if="order")
      v-col(
        cols="12"
        sm="4" 
        md="3"
        lg="2"
        v-for="(image, index) in order.images" :key="index"
      )
        v-card
          v-img( contain height="180px" :src="image.path.original")
          v-card-actions
            v-btn(
              color="primary"
              block outlined
              @click.prevent="download(image)"
              download
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
    download: async function (image) {
      try {
        const response = await this.$axios.$get(image.path.original, { responseType: 'blob' })
        const blob = new Blob([response], { type: 'image/jpeg' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = image.originalName
        link.click()
        URL.revokeObjectURL(link.href)
      } catch (error) {
        console.error(error)
      }
    },
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
