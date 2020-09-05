<template lang="pug">
button(
  :class="{'toggle': toggle}"
  @click="toggleBurger"
).burger
  .line-1
  .line-2
  .line-3
</template>
<script>
export default {
  props: ['cb'],
  data: function () {return{
    toggle: false
  }},
  methods: {
    toggleBurger: function () {
      this.toggle = !this.toggle
      if(this.cb) this.cb()
    }
  }
}
</script>
<style lang="scss" scoped>
.burger {
  position: relative;
  width: 32px;
  height: 22px;
  border: none;
  background-color: rgba(0,0,0,0);

  div {
    position: absolute;
    height: 1px;
    width: 32px;
    background-color: map-get($mainColors, gray);
    border-radius: 2px;
    transition: map-get($transitions, fast);
  }

  .line {
    &-1 {
      top: 0;
    }
    
    &-2 {
      top: 50%;
    }

    &-3 {
      top: 100%;
    }
  }

  &.toggle {
    .line {
      &-1 {
        top: 50%;
        transform: rotate(405deg);
      }

      &-2 {
        width: 0px;
        opacity: 0;
      }

      &-3 {
        top: 50%;
        transform: rotate(495deg);
      }
    }
  }
}
</style>