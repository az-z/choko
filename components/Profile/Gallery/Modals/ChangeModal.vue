<template lang="pug">
.change-modal
  .change-modal__bg
  .change-modal__body
    .change-modal__header
      h3.change-modal__title Изменить галерею
    .change-modal__content
      form.change-modal__form
        .change-modal__form-group
          label.change-modal__label Название
          input.change-modal__input
        .change-modal__form-group
          label.change-modal__label Цена
          input.change-modal__input
        .change-modal__form-group
          label.change-modal__label Описание
          input.change-modal__input
        .change-modal__form-group
          label.change-modal__label Активность
          input(type="checkbox").change-modal__input
      .change-modal__google-drive
        button.btn.btn-google.change-modal__btn-google-drive
          svg-icon(name="google" width="18px" height="18px").change-modal__icon
          span Добавить фото
        .change-modal__photos
          img(src="/images/photo.jpg").change-modal__photo
    .change-modal__footer
</template>
<style lang="scss" scoped>
.change-modal {
  &__bg {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.6);
    z-index: 100;
  }
  &__body {
    position: fixed;
    width: 640px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 20px;
    padding: 2rem;
    z-index: 101;
  }
  &__label {
    display: block;
  }
  &__content {
    display: flex;
  }
  &__google-drive {
    margin-left: 1rem;
  }
  &__btn-google-drive {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__photos {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  &__photo {
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: 16px;
  }
  &__icon {
    margin-right: 12px;
  }
}
</style>