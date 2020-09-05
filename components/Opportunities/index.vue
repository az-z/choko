<template lang="pug">
.opportunities.container
  .opportunities__title Возможности
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
  &__title {
    text-align: center;
    font-size: 2rem;
    font-weight: 600;
    width: fit-content;
    padding-bottom: .5rem;
    margin: 2rem auto;
    border-bottom: 2px solid map-get($mainColors, main-2);
  }
}
</style>