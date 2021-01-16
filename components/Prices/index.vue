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
          ru: this.$t('landing.opportunities.trial.title'),
          ua: 'Триал'
        },
        price: {
          num: this.$t('landing.opportunities.trial.price'),
          color: 'purple'
        },
        html: {
          ru: this.$t('landing.opportunities.trial.description'),
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
          ru: this.$t('landing.opportunities.package1.title'),
          ua: 'Місяць'
        },
        price: {
          num: this.$t('landing.opportunities.package1.price'),
          color: 'orange'
        },
        html: {
          ru: this.$t('landing.opportunities.package1.description'),
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
          ru: this.$t('landing.opportunities.package2.title'),
          ua: 'Рік'
        },
        price: {
          num: this.$t('landing.opportunities.package2.price'),
          color: 'green'
        },
        html: {
          ru: this.$t('landing.opportunities.package2.description'),
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
