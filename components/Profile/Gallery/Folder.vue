<template lang="pug">
.folder User
  .folder__folder
    .folder__mainfolder
    .folder__mainfoldershadow
      .folder__title {{ gallery.title }}
      nuxt-link(:to="`/gallery/${gallery._id}`").folder__link {{ link }}
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
      return `${window.location.origin}/${this.gallery._id}`
    }
  }
}
</script>
<style lang="scss" scoped>
.folder {
  &__title {
    font-size: 1.2rem;
    padding: .5rem;
    font-weight: 600;
    color: #434;
  }
  &__link {
    display: block;
    width: 200px;
    padding: .5rem;
    color: #222;
    white-space: normal;
    &:hover {
      text-decoration: underline;
    }
  }
  &__folder {
    position: relative;
    margin-top: 2rem;
    height: 270px;
    width: 300px;
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
    // box-shadow: 0 0 4px rgba(0,0,0,0.4);
    border-radius: 0 1rem 1rem;
    background-color: map-get($mainColors, blue);
    z-index: 5;
    // &::after {
    //   content: '';
    //   display: block;
    //   position: absolute;
    //   width: 120px;
    //   height: 3px;
    //   left: 0;
    //   top: -1px;
    // }
  }
  &__mainfoldershadow {
    position: absolute;
    width: 300px;
    height: 210px;
    bottom: 0;
    // box-shadow: 0 0 4px rgba(0,0,0,0.4);
    border-radius: 0 1rem 1rem;
    background-color: map-get($mainColors, grayMore);
    z-index: 7;
  }
  &__bookmarkfolder {
    position: absolute;
    width: 120px;
    height: 240px;
    top: 20px;
    // box-shadow: 0 0 4px rgba(0,0,0,0.4);
    border-radius: 1rem;
    background-color: map-get($mainColors, blue);
  }
  &__contentfolder {
    position: absolute;
    width: 300px;
    height: 210px;
    bottom: 0;
    box-shadow: 0 0 4px rgba(0,0,0,0.4);
    border-radius: 1rem;
    background-color: map-get($mainColorsFolder, white);
    z-index: 6;
    transition: .3s;
    background-image: url("/images/photo.jpg");
    background-size: cover;
    width: 100%;
  }
}
</style>