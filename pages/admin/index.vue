<template lang="pug">
v-container( fluid )
  h2 Тут можно вывести статистику и инфу для быстрого просмотра
  v-row
    v-col(
      colls="12"
      md="4"
    )
      v-card
        v-card-title Пример
        v-card-text
          v-sparkline(
            :fill="true"
            :smooth="25"
            color="green"
            :value="[2,3,1,4,7,5,3,4,5,6,7,8,9,8,7,4,8,9,4,5,8,9]"
            auto-draw
          )
    v-col(
      colls="12"
      md="4"
    )
      v-card
        v-card-title Пример
        v-card-text
          v-sparkline(
            :fill="true"
            :smooth="25"
            :value="[2,3,1,4,7,5,3,4,5,6,7,8,9,8,7,4,8,9,4,5,8,9]"
            auto-draw
          )
    v-col(
      colls="12"
      md="4"
    )
      v-card
        v-card-title Пример
        v-card-text
          v-sparkline(
            :smooth="25"
            :value="[2,3,1,4,7,5,3,4,5,6,7,8,9,8,7,4,8,9,4,5,8,9]"
            stroke-linecap="round"
            auto-draw
            color="deep-orange" 
          )
            template(v-slot:label="item") {{ item.value }}
</template>

<script>
export default {
  name: 'AdminPage',
  layout: 'admin',
  data: function () {return{
    value: [
      423,
      446,
      675,
      510,
      590,
      610,
      760,
    ]
  }}
}
</script>

<style lang="scss" scoped></style>
