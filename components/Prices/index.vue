<template lang="pug">
.prices(
  id="prices"
  class="grey lighten-3"
)
  v-container
    h2.display-2.mb-6.text-center {{ $t('landing.prices.title') }}
    v-row
      v-col(  
        v-for="(card, index) in cards" :key="index"
        cols="12"
        sm="6"
        md="6" 
        lg="4"
        xl="4"
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
        title: {
          ru: 'Триал',
          ua: 'Триал'
        },
        price: {
          num: 0,
          color: 'purple'
        },
        html: {
          ru: `<ul><li class="green--text">14 дней бесплатно</li><li>Безлимитные галереи</li><li>Прямые платежи</li><li>Никакой комиссии</li></ul>`,
          ua: '<ul><li class="green--text">14 днів безкоштовно</li><li>Безлімітні галереї</li><li>Прямі платежі</li><li>Ніякої комісії</li></ul>'
        },
        color: 'purple',
        button: {
          text: this.$t('buttons.try'),
          color: 'purple'
        }
      },
      {
        title: {
          ru: 'Месяц',
          ua: 'Місяць'
        },
        price: {
          num: 990,
          color: 'orange'
        },
        html: {
          ru: `<ul><li>Безлимитные галереи</li><li>Прямые платежи</li><li>Никакой комиссии</li><li>Приоритетная поддержка</li></ul>`,
          ua: '<ul><li>Безлімітні галереї</li><li>Прямі платежі</li><li>Ніякої комісії</li><li>Пріоритетна підтримка</li></ul>'
        },
        color: 'orange',
        button: {
          text: this.$t('buttons.try'),
          color: 'orange'
        }
      },
      {
        title: {
          ru: 'Год',
          ua: 'Рік'
        },
        price: {
          num: 9700,
          color: 'green'
        },
        html: {
          ru: `<ul><li>Безлимитные галереи</li><li>Прямые платежи</li><li>Никакой комиссии</li><li>Приоритетная поддержка</li></ul>`,
          ua: '<ul><li>Безлімітні галереї</li><li>Прямі платежі</li><li>Ніякої комісії</li><li>Пріоритетна підтримка</li></ul>'
        },
        color: 'green',
        button: {
          text: this.$t('buttons.try'),
          color: 'green'
        }
      }
    ]
  }}
}
</script>
<style lang="scss" scoped></style>
