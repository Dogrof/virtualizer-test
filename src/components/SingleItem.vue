<template>
    <div class="single-item" v-bind="$attrs">
        <svg
                :height="size"
                :width="size"
                @click="isPopupShown = !isPopupShown"
        >
            <circle
                    cx="50%"
                    cy="50%"
                    :r="(size - 30) / 2"
                    :fill="color"
            />
        </svg>
        <div class="single-item__popup" v-if="isPopupShown">{{ color }}</div>
    </div>

</template>

<script>
import {randomizeColor} from "@/helpers/itemHelper";

let interval;

export default {
  data() {
    return {
      isPopupShown: false,
      color: randomizeColor()
    };
  },
  props: {
    size: {
      type: Number,
      default: 100,
    },
  },
  beforeMount() {
    interval = setInterval(() => {
      this.color = randomizeColor();
    }, 1000);
  },
  beforeUnmount() {
    clearInterval(interval);
  }
};
</script>
<style scoped lang="scss">
.single-item {
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
