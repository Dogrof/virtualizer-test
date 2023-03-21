<template>
  <div class="single-item">
    <svg
        :height="height"
        :width="width"
        @click="isPopupShown = !isPopupShown"
    >
      <circle
          :cx="20"
          :cy="20"
          :r="radius"
          :fill="updatedColor || color"
      />

    </svg>
    <div class="single-item__popup" v-if="isPopupShown">{{updatedColor || color}}</div>
  </div>

</template>

<script >
import {randomizeColor} from "@/helpers/itemHelper";

export default {
  data() {
    return {
      updatedColor: '',
      isPopupShown: false
    };
  },
  props: {
    width: {
      type: Number,
      default: 40,
    },
    height: {
      type: Number,
      default: 40,
    },
    radius: {
      type: Number,
      default: 10,
    },
    color: {
      type: String,
      default: 'white'
    },
  },
  created() {
    setInterval(() => {
      this.updatedColor = randomizeColor();
    }, 1000);
  },
};
</script>
<style scoped lang="scss">
.single-item{
  position: relative;
  width: 44px;
  height: 44px;

  &__popup {
    position: absolute;
    padding: 10px;
    background-color: bisque;
    min-width: 128px;
    z-index: 1;
    top: -25px;
    left: 25px;
  }
}
svg {
  cursor: pointer;
  transition: transform 0.2s;

  circle,
  rect {
    transition: fill 0.2s;
  }
}
</style>