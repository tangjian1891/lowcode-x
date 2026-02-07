<template>
  <div class="list-renderer-container flex flex-col flex-1">
    <!-- 1. 自定义工具栏 -->
    <div class="list-toolbar">
      <div class="left-actions">
        <el-button type="primary" icon="Plus" @click="handleAdd">新增</el-button>
        <el-button icon="Refresh" @click="viewModel.refresh()">刷新</el-button>
      </div>
      <div class="right-actions">
        <!-- 预留搜索等区域 -->
      </div>
    </div>

    <!-- 2. 表格区域 -->
    <div class="list-table-wrapper">
      <vxe-grid ref="gridRef" v-bind="viewModel.grid" :data="viewModel.grid.data">
        <!-- 如果需要自定义列模板，可以在这里扩展 -->
      </vxe-grid>
    </div>

    <!-- 3. 自定义分页 -->
    <div class="list-pagination">
      <el-pagination
        v-model:current-page="viewModel.pagination.currentPage"
        v-model:page-size="viewModel.pagination.pageSize"
        :page-sizes="viewModel.pagination.pageSizes"
        :total="viewModel.pagination.total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="viewModel.handlePageSizeChange"
        @current-change="viewModel.handlePageChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import type { VxeGridInstance } from "vxe-table";
import { ListRendererModel } from "./list-renderer-model";
import { api } from "@/api";
import { AppDialog } from "@/AppUI/AppDialog/AppDialog";
import FormRenderer from "../form-renderer/form-renderer.vue";

const props = defineProps({
  menuId: {
    type: String,
    default: () => {
      return useRoute().params.menuId as string;
    },
  },
});

const gridRef = ref<VxeGridInstance<any>>();
const viewModel = new ListRendererModel({ menuId: props.menuId });

onMounted(async () => {
  const schema = await api.form.getFormSchema(props.menuId);

  viewModel.init(schema.fields);
  viewModel.loadData();
});

// 处理新增
const handleAdd = () => {
  console.log("Handle Add New Record");
  // 此处可调用 viewModel 的方法或打开弹窗

  const appDialog = AppDialog.create(FormRenderer, {
    menuId: props.menuId,
  });
  appDialog.dialogProps.title="新增"
};
</script>

<style lang="scss" scoped>
.list-renderer-container {
  height: 100%;
  padding: 16px;
  background-color: #fff;
  overflow: hidden;

  .list-toolbar {
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .list-table-wrapper {
    flex: 1;
    overflow: hidden;
    margin-bottom: 12px;
  }

  .list-pagination {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
