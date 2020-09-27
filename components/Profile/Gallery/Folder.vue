<template lang="pug">
.folder
  .folder__folder(v-if="gallery")
    .folder__mainfolder
    .folder__mainfoldershadow
      .folder__header
        .folder__title {{ gallery.title }}
        nuxt-link(:to="`/profile/gallery/change/${gallery._id}`").folder__button-change Редактировать
      .folder__calash
        img(
          src="/images/photo.jpg"
          v-for="index in getRandomInt(2, 10)" :key="index"
        ).folder__img
      button(@click="copy").folder__button-wrapper
        svg-icon(name="link-2").folder__icon
        span.folder__button Ссылка
        input(type="hidden" v-model="link" id="link-to-copy")
    .folder__bookmarkfolder
    .folder__contentfolder
</template>
<script>
export default {
  props: {
    gallery: {
      type: Object,
      required: true
    }
  },
  computed: {
    link:  function () {
      return `${window.location.origin}/gallery/${this.gallery._id}`
    }
  },
  methods: {
    getRandomInt: function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    copy: function () {
      const copyText = document.getElementById('link-to-copy')
      copyText.type = 'text'
      copyText.select()
      copyText.setSelectionRange(0, 99999)
      document.execCommand("copy")
      copyText.type = 'hidden'
      this.$notify({
        title: 'System',
        text: 'Ссылка добавлена в буфер обмена',
        group: 'foo',
        type: 'success'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
$radius: 16px;
.folder {
  &__header {
    display: flex;
    align-items: center;
    padding: .5rem;
  }
  &__button-change {
    margin-left: auto;
    color: #222;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  &__title {
    font-size: 1.2rem;
    font-weight: 600;
    color: #434;
  }
  &__button-wrapper {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin: .5rem 1rem;
    padding: .3rem 0;
    margin-top: auto;
    justify-content: center;
    border-radius: 12px;
    transition: map-get($transitions, fast);
    border: none;
    background-color: rgba(0,0,0,0);
    &:hover {
      background-color: rgba(0,0,0,.2);
      .folder__button {
        text-decoration: underline;
      }
    }
  }
  &__calash {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 40px 40px;
    grid-gap: .5rem;
    padding: 0 1rem;
  }
  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
  &__icon {
    z-index: 1500;
    width: 18px;
    height: 18px;
  }
  &__button {
    padding: .5rem;
    color: #222;
    white-space: normal;
    font-weight: 500;
  }
  &__folder {
    position: relative;
    margin-top: 2rem;
    height: 270px;
    width: 300px;
    border-radius: 0 $radius $radius;
    overflow: hidden;
    &:hover {
      .folder__contentfolder {
        transform: translateY(-10px) rotate(20deg);
      }
    }
  }
  &__mainfolder {
    position: absolute;
    bottom: 0;
    width: 300px;
    height: 220px;
    border-top-right-radius: $radius;
    background-color: map-get($mainColors, blue);
    z-index: 5;
  }
  &__mainfoldershadow {
    position: absolute;
    width: 300px;
    height: 210px;
    bottom: 0;
    // box-shadow: 0 0 4px rgba(0,0,0,0.4);
    border-radius: 0 $radius 0 0;
    background-color: map-get($mainColors, grayMore);
    z-index: 7;
    display: flex;
    flex-direction: column;
  }
  &__bookmarkfolder {
    position: absolute;
    width: 120px;
    height: 240px;
    top: 20px;
    // box-shadow: 0 0 4px rgba(0,0,0,0.4);
    border-radius: $radius;
    background-color: map-get($mainColors, blue);
  }
  &__contentfolder {
    position: absolute;
    width: 300px;
    height: 210px;
    bottom: 0;
    box-shadow: 0 0 4px rgba(0,0,0,0.4);
    border-radius: $radius;
    background-color: map-get($mainColorsFolder, white);
    z-index: 6;
    transition: .3s;
    background-image: url("/images/photo.jpg");
    background-size: cover;
    width: 100%;
  }
}
</style>