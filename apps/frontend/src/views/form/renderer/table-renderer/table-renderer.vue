<template>
  <div class="table-renderer">
    <!-- 表格渲染区域 -->
    <vxe-grid ref="gridRef" v-bind="viewModel.grid" :data="viewModel.grid.data"></vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, type PropType } from "vue";
import type { VxeGridInstance } from "vxe-table";
import { TableRendererModel } from "./table-renderer-model";

const props = defineProps({
  menuId: {
    type: String,
    default: () => {
      return useRoute().params.menuId as string;
    },
  },
});

const gridRef = ref<VxeGridInstance<any>>();
const viewModel = new TableRendererModel();
onMounted(async () => {
  const schema = await api.form.getFormSchema(props.menuId);
  console.log("123", schema);

  viewModel.init(schema.fields);
});
</script>

<style lang="scss" scoped>
.table-renderer {
  overflow: hidden;
  flex: 1;
  padding: 20px;
}
</style>
