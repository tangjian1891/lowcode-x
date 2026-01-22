<template>
  <div class="setting-wrapper p-4 overflow-auto">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="组件属性" name="component">
        <div v-if="activeField" class="prop-list">
          <!-- Dynamic Property Editor Based on Component Type -->
          <div class="prop-item mb-4">
            <div class="label text-sm font-medium mb-2">组件 ID</div>
            <el-input v-model="activeField.id" disabled />
          </div>

          <div class="prop-item mb-4">
            <div class="label text-sm font-medium mb-2">字段标签</div>
            <el-input v-model="activeField.label" />
          </div>

          <div class="prop-item mb-4">
            <div class="label text-sm font-medium mb-2">字段名称 (name)</div>
            <el-input v-model="activeField.name" />
          </div>

          <!-- Placeholder for more attribute editors -->
          <div class="text-gray-400 text-xs text-center py-10 border-t mt-10">针对 {{ activeField.type }} 的更多属性正在开发中...</div>
        </div>
        <div v-else class="empty-tip flex flex-col items-center justify-center py-20 text-gray-400">
          <el-icon class="text-30px mb-2"><Pointer /></el-icon>
          <p>请在画布中选择组件</p>
        </div>
      </el-tab-pane>

      <el-tab-pane label="表单配置" name="form">
        <div class="form-props p-2">
          <el-form label-position="top">
            <el-form-item label="标签宽度">
              <el-input v-model="viewModel.state.formProps.labelWidth" />
            </el-form-item>
            <el-form-item label="标签位置">
              <el-radio-group v-model="viewModel.state.formProps.labelPosition">
                <el-radio-button label="left">左对齐</el-radio-button>
                <el-radio-button label="right">右对齐</el-radio-button>
                <el-radio-button label="top">顶部对齐</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="全局尺寸">
              <el-radio-group v-model="viewModel.state.formProps.size">
                <el-radio-button label="large">大</el-radio-button>
                <el-radio-button label="default">中</el-radio-button>
                <el-radio-button label="small">小</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, computed } from "vue";
import type { FormDesignerViewModel } from "../form-model";
import { Pointer } from "@element-plus/icons-vue";

const viewModel = inject<FormDesignerViewModel>("viewModel")!;
const activeTab = ref("component");

const activeField = computed(() => viewModel.activeField);
</script>

<style lang="scss" scoped>
.setting-wrapper {
  background-color: #fff;
}
</style>
