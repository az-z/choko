<template lang="pug">
v-container
  v-row
    v-col( cols="12" sm="6" md="4"  )
      v-card
        v-card-title Месяц
        v-card-text 990 грн
        v-card-actions
          v-btn(
            color="success"
            nuxt
            block
            to="/profile/statuses/month"
          ) Оформить на месяц
    v-col( cols="12" sm="6" md="4"  )
      v-card
        v-card-title Год
        v-card-text 9700 грн
        v-card-actions
          v-btn(
            nuxt
            color="success"
            block
            to="/profile/statuses/year"
          ) Оформить на год
</template>
