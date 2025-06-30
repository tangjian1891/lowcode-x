<template>
  <div class="tj-table-area">
    <!-- 表格区域内容 -->
    <vxe-grid v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script lang="tsx" setup>
// 定义表格区域的逻辑
import { type PropType } from "vue";
import type { ITjTable } from "../tj-table";
import type { VxeGridProps } from "vxe-table";
import RenderTableHeader from "./render-table-header.vue";
const props = defineProps({
  tjTable: {
    type: Object as PropType<ITjTable>,
    required: true,
  },
});
const slots = {
  header: (data) => {
    return h(RenderTableHeader, { data });
  },
};

const columns = computed(() => {
  const columns: any[] = [...props.tjTable.fields].map((item) => {
    return { ...item, field: item.id, title: item.formItemProps.label, slots };
  });

  if (props.tjTable.grid.buttons.length > 0) {
    columns.push({
      isTable: true,
      label: "操作",
      showOverflow: false,
      slots: {
        default: () => {
          return props.tjTable.grid.buttons.map((button) => {
            const component = button.component;
            return <component button={button} tjTable={props.tjTable}></component>;
          });
        },
      },
      width: "300px",
    });
  }
  return columns;
});
const count = ref(0);
const gridOptions = computed<VxeGridProps>(() => {
  return {
    height: "auto",
    minHeight: "300px",
    columns: columns.value,
    cellConfig: {},
    headerCellConfig: {
      padding: false,
    },
    showHeaderOverflow: "ellipsis",

    headerCellClassName: "qwer",
    data: props.tjTable.data,
  };
});
setInterval(() => {
  count.value++;
}, 2000);
console.log(gridOptions.value);
</script>

<style lang="scss" scoped>
.tj-table-area {
  /* 样式定义 */
  overflow: hidden;
  flex: 1;
  padding: 0 20px;
}
</style>
