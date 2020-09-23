<template lang="pug">
.modal-add-folde
  .modal-add-folde__bg
  .modal-add-folde_body
    .modal-add-folde__title Добавить новую галирею
    .modal-add-folde__content
      form(@submit.prevent="addGallery").modal-add-folde__form
        .modal-add-folde__form-group
          label(
            for="title"
          ).modal-add-folde__label Название
          input(
            type="text"
            name="title"
            id="title"
            v-model="form.title"
          ).modal-add-folde__input
        .modal-add-folde__form-group
          label(
            for="description"
          ).modal-add-folde__label Ссылка на папку
          input(
            type="text"
            name="description"
            id="description"
            v-model="form.description"
          ).modal-add-folde__input
        .modal-add-folde__buttons
          button.btn.btn-outline-main-3.modal-add-folde__submit Добавить
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data: function () {return{
    form: {
      title: null,
      description: null
    }
  }},
  methods: {
    ...mapActions({
      addGalleryVuex: 'Galleries/addGallery' 
    }),
    addGallery: function () {
      this.addGalleryVuex({ notify: this.$notify, form: this.form })
    }
  }
}
</script>
<style lang="scss" scoped>
.modal-add-folde {
  margin-top: map-get($indents, big);
  padding: 1rem;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 12px 12px 32px rgba(0,0,0,.05), 6px 6px 16px rgba(0,0,0,.1);
  width: fit-content;
  transition: .3s;
  &:hover {
    // box-shadow: 12px 12px 32px rgba(0,0,0,.2), 6px 6px 16px rgba(0,0,0,.1);
  }
  &__title {
    font-size: map-get($fontSizes, big);
    font-weight: 600;
    color: map-get($mainColors, dark);
  }
  &__label {
    display: block;
  }
  &__input {
    width: 100%;
  }
  &__buttons {
    margin-top: map-get($indents, middle);
    display: flex;
    justify-content: center;
  }
}
</style>