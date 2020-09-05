<template lang="pug">
#logo
  nuxt-link.logo(to="/") FTKL.RU
</template>
<style lang="scss" scoped>
.logo {
  color: map-get($mainColors, main-3);
  font-weight: 500;
  font-size: 1.25rem;
}
</style>