<template>
  <div class="form-render-wrapper p-4 max-w-800px mx-auto">
    <el-card v-if="viewModel.fields.length > 0">
      <el-form :label-width="viewModel.config.labelWidth" :label-position="viewModel.config.labelPosition" :size="viewModel.config.size">
        <div v-for="field in viewModel.fields" :key="field.id" class="mb-4">
          <component :is="getComponent(field.type)" :field="field" mode="runtime" />
        </div>
      </el-form>
    </el-card>
    <div v-else class="empty-tip text-center py-20 text-gray-400">表单暂无内容</div>
  </div>

  <teleport defer :to="`#${appDialog.teleportId}`">
    <el-button> 取消 </el-button>
    <ConfirmButton />
  </teleport>
</template>

<script lang="ts" setup>
import { onMounted, provide, Teleport } from "vue";
import { FormViewModel, materialMap } from "../../form-model";
import { instance } from "@/api/request";
import { AppDialog, useConfirmButton } from "@/AppUI/AppDialog/AppDialog";

const props = defineProps({
  menuId: {
    type: String,
    required: true,
  },
  appDialog: {
    type: AppDialog,
    required: true,
  },
  id: String,
});

const viewModel = new FormViewModel();
const [ConfirmButton, loading] = useConfirmButton(async () => {
  await new Promise((r) => {
    setTimeout(() => {
      r(1);
    }, 1000);
  });
});
// Provide to deep components if needed
provide("viewModel", viewModel);

onMounted(async () => {
  if (props.menuId) {
    try {
      const res = (await instance.get(`/form/schema/${props.menuId}`)) as any;
      if (res) {
        // 直接使用 loadConfig 加载后端返回的 FormSchema 数据
        // 后端返回结构为 { fields, config, ... }
        // loadConfig 期望参数为 FormConfig { fields, config }
        // 刚好匹配
        viewModel.loadData(res);
      }
    } catch (error) {
      console.error("Failed to fetch form schema:", error);
    }
  }
});

const getComponent = (type: string) => {
  return materialMap[type]?.component;
};
</script>

<style lang="scss" scoped>
.form-render-wrapper {
  background-color: transparent;
}
</style>
