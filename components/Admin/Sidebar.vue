<template lang="pug">
v-navigation-drawer(app v-model="model"  clipped permanent)
  v-list-item(
    nuxt
    to="/admin"
  )
    v-list-item-content
      v-list-item-title Adminpanel
      v-list-item-subtitle by Nevvord
  v-divider
  v-list( dense nav )
    v-list-item(
      nuxt
      to="/admin/users"
    )
      v-list-item-icon
        v-icon mdi-account-group
      v-list-item-content {{ $t('admin.sidebar.users') }} 
</template>
<script>
export default {
  data: () => ({
    model: true
  })
}
</script>
