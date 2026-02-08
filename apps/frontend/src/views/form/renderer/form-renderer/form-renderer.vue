<template>
  <div class="form-render-wrapper ">
      <el-form v-if="viewModel.fields.length > 0" :label-width="viewModel.config.labelWidth" :label-position="viewModel.config.labelPosition" :size="viewModel.config.size">
        <div v-for="field in viewModel.fields" :key="field.id" class="mb-4">
          <component :is="getComponent(field.type)" :field="field" mode="runtime" />
        </div>
      </el-form>
    <div v-else class="empty-tip text-center py-20 text-gray-400">表单暂无内容</div>
  </div>

  <teleport defer :to="`#${appDialog.teleportId}`">
    <el-button @click="appDialog.destory()"> 取消 </el-button>
    <ConfirmButton />
  </teleport>
</template>

<script lang="ts" setup>
import { onMounted, provide, Teleport } from "vue";
import { ElMessage } from "element-plus";
import { FormViewModel, materialMap } from "../../form-model";
import { api } from "@/api";

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
  id: {
    type: String,
  },
  onSuccess: {
    type: Function,
  },
});

const viewModel = new FormViewModel();
const [ConfirmButton, loading] = useConfirmButton(async () => {
  try {
    const data = {
      formId: props.menuId,
      data: viewModel.formData,
    };
    if (props.id) {
      (data as any).id = props.id;
    }
    await api.formData.save(data);
    ElMessage.success("保存成功");
    props.onSuccess?.();
    props.appDialog.destory();
  } catch (error) {
    console.error(error);
  }
});
// Provide to deep components if needed
provide("viewModel", viewModel);

onMounted(async () => {
  if (!props.menuId) return;

  try {
    const fetchMethods = [api.formSchema.get(props.menuId)] as any[];
    if (props.id) {
      fetchMethods.push(api.formData.get(props.id));
    } else {
      fetchMethods.push(api.formData.init(props.menuId));
    }

    const [schemaRes, initData] = await Promise.all(fetchMethods);

    if (schemaRes) {
      viewModel.loadData(schemaRes);
    }
    if (initData) {
      viewModel.setFormData(initData.data || initData);
    }
  } catch (error) {
    console.error("Failed to init form:", error);
  }
});

const getComponent = (type: string) => {
  return materialMap[type]?.component;
};
</script>

<style lang="scss" scoped></style>
