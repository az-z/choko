<template lang="pug">
.profile.bg-dark
  nuxt
  notifications(group="foo" position="right bottom")
</template>
<script>
export default {
  middleware: 'verify'
}
</script>