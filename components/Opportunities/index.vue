<template lang="pug">
.opportunities.container(id="opportunities")
  .opportunities__title {{ $t('landing.opportunities.title') }}
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
        title: {
          ru: 'Безопасность',
          ua: 'Безпека'
        },
        text: {
          ru: 'Не надо давать полный доступ к вашим файлам на яндекс диске.',
          ua: 'Не треба давати повний доступ до ваших файлів на яндекс диску.'
        }
      },
      {
        icon: 'buy',
        title: {
          ru: 'Оплата напрямую',
          ua: 'Оплата безпосередньо'
        },
        text: {
          ru: 'Никаких комиссий сервиса, клиент платит вам лично.',
          ua: 'Ніяких комісій сервісу, клієнт платить вам особисто.'
        } 
      },
      {
        icon: 'process',
        title: {
          ru: 'Контроль процесса заказа',
          ua: 'Контроль процесу замовлення'
        },
        text: {
          ru: 'Контролируйте процесс от заказа и оплаты до передачи файлов клиенту.',
          ua: 'Контролюйте процес від замовлення та оплати до передачі файлів клієнта.'
        }
      },
      {
        icon: 'webpage',
        title: {
          ru: 'Корзина',
          ua: 'Кошик'
        },
        text: {
          ru: 'Своя корзина в каждой галерее. Можно закрыть окно, а позже вернуться и сделать заказ.',
          ua: 'Своя кошик в кожній галереї. Можна закрити вікно, а пізніше повернутися і зробити замовлення.'
        }
      },
      {
        icon: 'protection',
        title: {
          ru: 'Защита фотографий',
          ua: 'Захист фотографій'
        },
        text: {
          ru: 'Система автоматом накладывать водяные знаки на фотографии для предпросмотра.',
          ua: 'Система автоматично накладати водяні знаки на фотографії для попереднього перегляду.'
        }
      },
      {
        icon: 'content',
        title: {
          ru: 'Публичная страница',
          ua: 'Публічна сторінка'
        },
        text: {
          ru: 'Страница фотографа с реквизитами и открытыми галереями.',
          ua: 'Сторінка фотографа з реквізитами і відкритими галереями.'
        }
      }
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