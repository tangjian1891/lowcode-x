<template>
  <div class="form-render-wrapper p-4 max-w-800px mx-auto">
    <el-card v-if="viewModel.state.fields.length > 0">
      <el-form
        :label-width="viewModel.state.formProps.labelWidth"
        :label-position="viewModel.state.formProps.labelPosition"
        :size="viewModel.state.formProps.size"
      >
        <div v-for="field in viewModel.state.fields" :key="field.id" class="mb-4">
          <component :is="getComponent(field.type)" :field="field" mode="runtime" />
        </div>
      </el-form>
    </el-card>
    <div v-else class="empty-tip text-center py-20 text-gray-400">表单暂无内容</div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, provide } from "vue";
import { FormViewModel, materialMap } from "./form-model";
import { instance } from "@/api/request";

const props = defineProps({
  menuId: {
    type: String,
    required: true,
  },
});

const viewModel = new FormViewModel();

// Provide to deep components if needed
provide("viewModel", viewModel);

onMounted(async () => {
  if (props.menuId) {
    try {
      const res = await instance.get(`/menu/info/${props.menuId}`);
      if (res.data && res.data.value) {
        viewModel.loadConfig(res.data.value);
      }
    } catch (error) {
      console.error("Failed to fetch menu info:", error);
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
