<template>
  <div
      ref="filterScrollContainer"
      class="virtual-container"
  >
    <div
        :style="{
          position: 'relative',
        }"
    >
      <div class="virtual-row" v-for="(virtualRow) in virtualItemsRow" :key="virtualRow.index">
        <div class="virtual-col" v-for="(virtualColumn) in virtualItemsCol" :key="virtualColumn.index">
          <div
              class="virtual-cell"
              :key="virtualColumn.index"
              :style="{
                position: 'absolute',
                top: 0,
                left: 0,
                width: `${virtualColumn.size}px`,
                height: `${virtualRow.size}px`,
                transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
              }"
          >
                <SingleItem
                  class="virtual-item"
                  v-for="item of virtualItemsRow"
                  :key="item.key"
                />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useVirtualizer } from "../virtual";
import { randomizeColor } from "@/helpers/itemHelper"
import SingleItem from "@/components/SingleItem.vue";

export default {
  components: {SingleItem},
  setup() {
    const addItems = ref(false);

    const fullItems = Array.from({ length: 100000 }, (_, i) => ({
      label: `${i}`,
      color: randomizeColor(),
      value: i,
    }));
    const items = computed(() => {
      return fullItems;
    });

    const filterScrollContainer = ref(null);
    const rowVirtualizer = computed(() => {
      return {
        count: 1000,
        getScrollElement: () => filterScrollContainer.value,
        estimateSize: () => 130,
        overscan: 5,
        debug: true,
      };
    });
    const columnVirtualizer = computed(() => {
      return {
        horizontal: true,
        count: 10000,
        getScrollElement: () => filterScrollContainer.value,
        estimateSize: () => 265,
        overscan: 5,
        debug: true,
      };
    });

    const virtualizerRow = useVirtualizer(rowVirtualizer);
    const virtualizerCol = useVirtualizer(columnVirtualizer);

    const virtualItemsRow = computed(() => virtualizerRow.value.getVirtualItems());
    const virtualItemsCol = computed(() => virtualizerCol.value.getVirtualItems());

    return {
      columnVirtualizer,
      rowVirtualizer,
      addItems,
      items,
      virtualItemsRow,
      virtualItemsCol,
      filterScrollContainer,
    };
  },
};
</script>


<style>
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.virtual-container {
  height: 100vh;
  width: 100%;
  overflow: auto;
}
.virtual-cell {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}
</style>