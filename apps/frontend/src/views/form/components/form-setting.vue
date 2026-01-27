<template>
  <div class="setting-wrapper overflow-hidden bg-white border-l h-full flex flex-col">
    <div class="setting-tabs-container">
      <div class="tabs-header flex border-b bg-gray-50/50">
        <div
          v-for="tab in tabs"
          :key="tab.value"
          class="tab-item flex-1 text-center py-3 text-13px cursor-pointer transition-all relative"
          :class="{ active: activeTab === tab.value }"
          @click="activeTab = tab.value"
        >
          {{ tab.label }}
        </div>
      </div>
    </div>

    <div class="setting-content flex-1 overflow-y-auto px-5 py-6 custom-scrollbar">
      <!-- Field Properties -->
      <div v-if="activeTab === 'component'" class="component-props">
        <div v-if="activeField">
          <div class="prop-group mb-6">
            <div class="group-title text-12px font-bold text-gray-400 uppercase mb-4 tracking-wider">基础属性</div>

            <div class="prop-item mb-5">
              <label class="block text-13px text-gray-600 mb-2">字段标签</label>
              <el-input v-model="activeField.label" placeholder="请输入名称" />
            </div>

            <div class="prop-item mb-5">
              <label class="block text-13px text-gray-600 mb-2">字段名称 (name)</label>
              <el-input v-model="activeField.name" placeholder="请输入标识" />
            </div>

            <div class="prop-item mb-5">
              <label class="block text-13px text-gray-600 mb-2 flex items-center">
                必填
                <el-tooltip content="开启后，提交表单时该字段不能为空" placement="top">
                  <el-icon class="ml-1 text-gray-400 cursor-help"><QuestionFilled /></el-icon>
                </el-tooltip>
              </label>
              <el-switch v-model="activeField.required" active-color="#00a29a" />
            </div>
          </div>

          <div class="prop-group">
            <div class="group-title text-12px font-bold text-gray-400 uppercase mb-4 tracking-wider">组件设置</div>
            <div class="text-gray-400 text-12px bg-gray-50 p-4 rounded border border-dashed border-gray-200">
              针对 {{ activeField.type }} 的更多高级属性正在迭代中...
            </div>
          </div>
        </div>
        <div v-else class="empty-state flex flex-col items-center justify-center py-20 text-gray-300">
          <el-icon class="text-48px mb-4 opacity-50"><Pointer /></el-icon>
          <p class="text-14px">请在画布中选择组件</p>
        </div>
      </div>

      <!-- Form Properties -->
      <div v-if="activeTab === 'form'" class="form-props">
        <div class="prop-group mb-6">
          <div class="group-title text-12px font-bold text-gray-400 uppercase mb-4 tracking-wider">显示设置</div>

          <div class="prop-item mb-5">
            <label class="block text-13px text-gray-600 mb-2">标签位置</label>
            <el-radio-group v-model="viewModel.config.labelPosition" size="default" class="w-full !flex">
              <el-radio-button label="left" class="flex-1">左对齐</el-radio-button>
              <el-radio-button label="right" class="flex-1">右对齐</el-radio-button>
              <el-radio-button label="top" class="flex-1">顶部</el-radio-button>
            </el-radio-group>
          </div>

          <div class="prop-item mb-5">
            <label class="block text-13px text-gray-600 mb-2">标签宽度</label>
            <el-input v-model="viewModel.config.labelWidth" placeholder="如: 100px" />
          </div>

          <div class="prop-item mb-5">
            <label class="block text-13px text-gray-600 mb-2">组件尺寸</label>
            <div class="flex gap-2">
              <el-radio-group v-model="viewModel.config.size" size="default">
                <el-radio-button label="large">大</el-radio-button>
                <el-radio-button label="default">中</el-radio-button>
                <el-radio-button label="small">小</el-radio-button>
              </el-radio-group>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, computed } from "vue";
import type { FormDesignerViewModel } from "../form-model";
import { Pointer, QuestionFilled } from "@element-plus/icons-vue";

const viewModel = inject<FormDesignerViewModel>("viewModel")!;
const activeTab = ref("component");

const tabs = [
  { label: "字段属性", value: "component" },
  { label: "表单属性", value: "form" },
];

const activeField = computed(() => viewModel.activeField);
</script>

<style lang="scss" scoped>
$primary-color: #00a29a;

.setting-wrapper {
  background-color: #fff;
}

.tabs-header {
  .tab-item {
    color: #606266;
    font-weight: 500;

    &:hover {
      color: $primary-color;
    }

    &.active {
      color: $primary-color;
      background-color: #fff;

      &::after {
        content: "";
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 2px;
        background-color: $primary-color;
      }
    }
  }
}

.custom-scrollbar {
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #e4e7ed;
    border-radius: 2px;
  }
}

:deep(.el-radio-button__inner) {
  width: 100%;
}

:deep(.el-radio-button.is-active .el-radio-button__inner) {
  background-color: $primary-color;
  border-color: $primary-color;
  box-shadow: -1px 0 0 0 $primary-color;
}
</style>
