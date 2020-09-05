<template lang="pug">
.page
  h1.class-h1 Page.vue
  ul.ulul
    li(v-for="(element, index) in array" :key="index") {{ element }}
  button(@click="remLastElement") Remove
</template>
<script>
export default {
  data() {return{
    array: [
      'text 1',
      'text 2',
      'text 3',
      'text 4',
      'text 5',
      'text 6',
      'text 7',
    ]
  }},
  methods: {
    remLastElement () {
      this.$axios.delete('/elements/remove/1').then(response => {
        this.array = this.array.filter((element, index) => index !== 1)
      }).catch(error => console.error(error))
    }
  }
}
</script>