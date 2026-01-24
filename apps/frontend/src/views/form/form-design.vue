<template>
  <div class="form-design-wrapper">
    <!-- Header -->
    <div class="form-design-header flex items-center justify-between p-3 border-b bg-white">
      <div class="form-title flex items-center">
        <el-button text icon="ArrowLeft" @click="$router.back()" class="mr-8px" />
        <el-input v-model="menuInfo.name" placeholder="请输入表单名称" class="w-240px" />
      </div>
      <div class="form-actions flex gap-3">
        <el-button @click="clearForm" type="warning">清空</el-button>
        <el-button @click="previewForm" type="primary">预览</el-button>
        <el-button @click="saveForm" type="primary">保存</el-button>
      </div>
    </div>

    <!-- Design Area -->
    <div class="form-design-container flex flex-1 overflow-hidden" v-if="viewModel">
      <form-sidebar class="flex-basis-300px border-r" />
      <form-canvas class="flex-1 bg-gray-50 p-4 overflow-auto" />
      <form-setting class="flex-basis-400px border-l" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, provide } from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import FormSidebar from "./components/form-sidebar.vue";
import FormCanvas from "./components/form-canvas.vue";
import FormSetting from "./components/form-setting.vue";
import { FormDesignerViewModel } from "./form-model";
import { instance } from "@/api/request";

const route = useRoute();
const menuId = route.params.menuId as string;
const menuInfo = ref<any>({ name: "", value: null });

// 实例化 ViewModel，不引入 materialList 以避免循环依赖
let viewModel: FormDesignerViewModel = new FormDesignerViewModel();

provide("viewModel", viewModel);

onMounted(async () => {
  if (menuId) {
    try {
      const res = await instance.get(`/menu/${menuId}`);
      menuInfo.value = res;

      const res2 = (await instance.get(`/form/schema/${menuId}`)) as any;
      viewModel.loadData(res2);
    } catch (error) {
      console.error("Failed to fetch menu info:", error);
    }
  }
});

const previewForm = () => {
  // 预览功能暂时关闭，等待后续重构预览组件
  ElMessage.info("预览功能正在升级中...");
};

const saveForm = async () => {
  try {
    const payload = {
      menuId: menuId,
      name: menuInfo.value.name,
      fields: viewModel.fields,
      config: viewModel.config,
    };
    await instance.post("/form/schema/save", payload);
    ElMessage.success("表单已保存");
  } catch (error) {
    console.error(error);
    ElMessage.error("保存失败");
  }
};

const clearForm = () => {
  viewModel.clearForm();
};
</script>

<style lang="scss" scoped>
.form-design-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #f5f7fa;

  .form-design-header {
    height: 60px;
    flex-shrink: 0;
    z-index: 10;
  }

  .form-design-container {
    height: calc(100vh - 60px);
  }
}
</style>
