<template>
  <div class="form-design-wrapper">
    <!-- Header -->
    <div class="form-design-header flex items-center justify-between px-6 bg-white border-b">
      <div class="header-left flex items-center gap-4">
        <el-button text icon="ArrowLeft" @click="$router.back()" class="!p-0 hover:bg-transparent" />
        <div class="form-title-group flex items-center gap-2">
          <el-icon class="text-18px text-gray-500"><Document /></el-icon>
          <el-input v-model="menuInfo.name" placeholder="未命名表单" class="title-input" />
        </div>
      </div>

      <div class="header-center">
        <div class="design-tabs flex items-center h-full">
          <div
            v-for="tab in designTabs"
            :key="tab.value"
            class="tab-item"
            :class="{ active: activeDesignTab === tab.value }"
            @click="activeDesignTab = tab.value"
          >
            {{ tab.label }}
          </div>
        </div>
      </div>

      <div class="header-right flex items-center gap-3">
        <el-button link class="preview-btn">
          <el-icon class="mr-4px"><View /></el-icon>预览
        </el-button>
        <el-button type="primary" class="save-btn" @click="saveForm">保存</el-button>
        <el-button circle icon="Share" class="share-btn" />
        <el-avatar :size="32" class="ml-2 cursor-pointer" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      </div>
    </div>

    <!-- Design Area -->
    <div class="form-design-container flex flex-1 overflow-hidden" v-if="viewModel">
      <form-sidebar class="basis-60" />
      <form-canvas class="flex-1" />
      <form-setting class="basis-100" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, provide } from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { Document, ArrowLeft, View, Share } from "@element-plus/icons-vue";
import FormSidebar from "./components/form-sidebar.vue";
import FormCanvas from "./components/form-canvas.vue";
import FormSetting from "./components/form-setting.vue";
import { FormDesignerViewModel } from "../form-model";
import { instance } from "@/api/request";

const route = useRoute();
const menuId = route.params.menuId as string;
const menuInfo = ref<any>({ name: "", value: null });

const activeDesignTab = ref("design");
const designTabs = [
  { label: "表单设计", value: "design" },
  { label: "功能设置", value: "feature" },
  { label: "表单发布", value: "publish" },
  { label: "数据管理", value: "data" },
];

// 实例化 ViewModel
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
</script>

<style lang="scss" scoped>
$primary-color: #00a29a;

.form-design-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #f0f2f5;

  .form-design-header {
    height: 56px;
    flex-shrink: 0;
    z-index: 100;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);

    .title-input {
      :deep(.el-input__wrapper) {
        box-shadow: none !important;
        padding: 0;
        background: transparent;
      }
      :deep(.el-input__inner) {
        font-size: 16px;
        font-weight: 500;
        color: #303133;
      }
    }

    .design-tabs {
      .tab-item {
        height: 56px;
        line-height: 56px;
        padding: 0 20px;
        font-size: 14px;
        color: #606266;
        cursor: pointer;
        position: relative;
        transition: all 0.3s;

        &:hover {
          color: $primary-color;
        }

        &.active {
          color: $primary-color;
          font-weight: 500;

          &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 20px;
            right: 20px;
            height: 3px;
            background-color: $primary-color;
            border-radius: 3px 3px 0 0;
          }
        }
      }
    }

    .preview-btn {
      color: #606266;
      border: 1px solid #dcdfe6;
      padding: 8px 16px;
      border-radius: 4px;
      height: 32px;
      &:hover {
        color: $primary-color;
        border-color: $primary-color;
        background-color: rgba(0, 162, 154, 0.05);
      }
    }

    .save-btn {
      background-color: $primary-color;
      border-color: $primary-color;
      height: 32px;
    }
  }

  .form-design-container {
    height: calc(100vh - 56px);
  }
}
</style>
