<template lang="pug">
.user User
  .user__folder
    .user__mainfolder
    .user__mainfoldershadow
    .user__bookmarkfolder
</template>
<style lang="scss" scoped>
.user {
  &__folder {
    position: relative;
    margin-top: 2rem;
    height: 270px;
    width: 300px;
    overflow: hidden;
    &:hover {
      .user__contentfolder {
        transform: translateY(-10px) rotate(20deg);
      }
    }
  }
  &__mainfolder {
    position: absolute;
    bottom: 0;
    width: 300px;
    height: 220px;
    box-shadow: 0 0 4px rgba(0,0,0,0.4);
    border-radius: 0 1rem 1rem;
    background-color: map-get($mainColorsFolder, yellow1);
    z-index: 5;
  }
  &__mainfoldershadow {
    position: absolute;
    width: 300px;
    height: 210px;
    bottom: 0;
    box-shadow: 0 0 4px rgba(0,0,0,0.4);
    border-radius: 0 1rem 1rem;
    background-color: map-get($mainColorsFolder, green1);
    z-index: 7;
  }
  &__bookmarkfolder {
    position: absolute;
    width: 120px;
    height: 240px;
    top: 0;
    box-shadow: 0 0 4px rgba(0,0,0,0.4);
    border-radius: 1rem;
    background-color: map-get($mainColorsFolder, google);
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
  }
}
</style>