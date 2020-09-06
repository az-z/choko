<template lang="pug">
.prices.container(id="prices")
  .prices__title Цены
  .prices__cards
    Card(
      v-for="(card, index) in cards" :key="index"
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
        html: `<p class="text-main-2">14 дней бесплатно</p><p>Безлимитные галереи</p><p>Прямые платежи</p><p>Никакой комиссии</p>`,
        button: {
          text: 'Попробовать',
          color: 'purple'
        }
      },
      {
        title: 'Месяц',
        price: {
          num: 990,
          color: 'yellow'
        },
        html: `<p>Безлимитные галереи</p><p>Прямые платежи</p><p>Никакой комиссии</p><p>Приоритетная поддержка</p>`,
        button: {
          text: 'Попробовать',
          color: 'yellow'
        }
      },
      {
        title: 'Год',
        price: {
          num: 9700,
          color: 'main-2'
        },
        html: `<p>Безлимитные галереи</p><p>Прямые платежи</p><p>Никакой комиссии</p><p>Приоритетная поддержка</p>`,
        button: {
          text: 'Попробовать',
          color: 'main-2'
        }
      }
    ]
  }}
}
</script>
<style lang="scss" scoped>
.prices {
  background-color: lighten(map-get($mainColors, main-3), $amount: 42);
  padding-top: 7rem;
  padding-bottom: 7rem;

  &__title {
    @include mainPageTitle;
    margin-top: 0;
  }

  &__cards {
    display: grid;
    grid-template-columns: minmax(240px, 1fr);
    @media (min-width: 1366px) {
      grid-template-columns: repeat(3, minmax(340px, 1fr));
      grid-gap: 2rem;
      width: fit-content;
      margin: 0 auto;
    }
  }
}
</style>