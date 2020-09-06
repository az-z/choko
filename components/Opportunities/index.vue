<template lang="pug">
.opportunities.container(id="opportunities")
  .opportunities__title Возможности
  .opportunities__cards
    Card(
      v-for="(possibility, index) in opportunities" :key="index"
      :icon="possibility.icon"
      :title="possibility.title"
      :text="possibility.text"
    )
</template>
<script>
import Card from './Card'
export default {
  components: {
    Card
  },
  data: function () {return {
    opportunities: [
      {
        icon: 'shield',
        title: 'Безопасность',
        text: 'Не надо давать полный доступ к вашим файлам на яндекс диске.'
      },
      {
        icon: 'buy',
        title: 'Оплата напрямую',
        text: 'Никаких комиссий сервиса, клиент платит вам лично.'
      },
      {
        icon: 'process',
        title: 'Контроль процесса заказа',
        text: 'Контролируйте процесс от заказа и оплаты до передачи файлов клиенту.'
      },
      {
        icon: 'webpage',
        title: 'Корзина',
        text: 'Своя корзина в каждой галерее. Можно закрыть окно, а позже вернуться и сделать заказ.'
      },
      {
        icon: 'protection',
        title: 'Защита фотографий',
        text: 'Система автоматом наклаыдвает водяные знаки на фотографии для предпросмотра.'
      },
      {
        icon: 'content',
        title: 'Публичная страница',
        text: 'Страница фотографа с реквизитами и открытыми галереями.'
      },
    ]
  }}
}
</script>
<style lang="scss" scoped>
.opportunities {
  width: fit-content;
  margin: 0 auto;

  &__title {
    @include mainPageTitle;
  }

  &__cards {
    display: grid;
    grid-template-columns: 1fr;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1366px) {
      padding: 0 4rem;
      grid-template-columns: repeat(3, minmax(340px, 1fr));
      grid-gap: 2rem;
    }
  }
}
</style>