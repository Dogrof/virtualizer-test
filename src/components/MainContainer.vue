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
                <div class="virtual-col" v-for="(virtualItem) in virtualItemsCol" :key="virtualItem.index">
                    <SingleItem
                            class="virtual-item"
                            :style="{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: `${virtualItem.size}px`,
                                height: `${virtualRow.size}px`,
                                transform: `translateX(${virtualItem.start}px) translateY(${virtualRow.start}px)`,
                              }"
                            :size="100"
                    />
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import {ref, computed} from "vue";
import {useVirtualizer} from "../virtual";
import SingleItem from "@/components/SingleItem.vue";

export default {
  components: {SingleItem},
  setup() {
    const filterScrollContainer = ref(null);
    const rowVirtualizer = computed(() => {
      return {
        count: 100000,
        getScrollElement: () => filterScrollContainer.value,
        estimateSize: () => 100,
        overscan: 5,
      };
    });
    const columnVirtualizer = computed(() => {
      return {
        horizontal: true,
        count: 100000,
        getScrollElement: () => filterScrollContainer.value,
        estimateSize: () => 100,
        overscan: 5,
      };
    });

    const virtualizerRow = useVirtualizer(rowVirtualizer);
    const virtualizerCol = useVirtualizer(columnVirtualizer);

    const virtualItemsRow = computed(() => virtualizerRow.value.getVirtualItems());
    const virtualItemsCol = computed(() => virtualizerCol.value.getVirtualItems());

    return {
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
