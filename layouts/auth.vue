<template lang="pug">
v-app
  v-main.primary.lighten-3
    nuxt
  notifications(group="foo" position="right bottom")
    template(slot="body" slot-scope="props")
      v-alert(
        :type="props.item.type"
        border="left"
      )
        .title {{props.item.title}}
        div(v-html="props.item.text")
</template>