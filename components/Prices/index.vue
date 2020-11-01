<template lang="pug">
.prices(
  id="prices"
  class="primary"
)
  v-container
    h2.prices__title.text-center.white--text Цены
    v-row
      v-col(
        v-for="(card, index) in cards" :key="index"
        close="12"
        md="4" 
      )
        Card(
          :card="card"
        )
</template>
<script>
import Card from './Card'
export default {
  components: {
    Card
  },
  data: function () {return{
    cards: [
      {
        title: 'Триал',
        price: {
          num: 0,
          color: 'purple'
        },
        html: `<ul><li class="text-main-2">14 дней бесплатно</li><li>Безлимитные галереи</li><li>Прямые платежи</li><li>Никакой комиссии</li></ul>`,
        button: {
          text: 'Попробовать',
          color: 'purple'
        }
      },
      {
        title: 'Месяц',
        price: {
          num: 990,
          color: 'orange'
        },
        html: `<ul><li>Безлимитные галереи</li><li>Прямые платежи</li><li>Никакой комиссии</li><li>Приоритетная поддержка</li></ul>`,
        button: {
          text: 'Попробовать',
          color: 'orange'
        }
      },
      {
        title: 'Год',
        price: {
          num: 9700,
          color: 'green'
        },
        html: `<ul><li>Безлимитные галереи</li><li>Прямые платежи</li><li>Никакой комиссии</li><li>Приоритетная поддержка</li></ul>`,
        button: {
          text: 'Попробовать',
          color: 'green'
        }
      }
    ]
  }}
}
</script>
<style lang="scss" scoped>

</style>