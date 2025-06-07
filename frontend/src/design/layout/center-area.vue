<template>
  <div class="center-form">
    <!-- 表单设计渲染-拖拽放入区 -->
    <el-form class="drag-form jas-scrollbar" ref="ruleFormRef" :model="designForm">
      <vue-draggable :tag="ElRow" @remove="onRemove" class="drag-components-area" v-model="data.formTree" :group="data.centerGroup" @add="data.onAdd">
        <component
          :field="data.fieldMapping[f.id]"
          :data="data"
          :is="designComponentMap[data.fieldMapping[f.id].type]"
          v-for="f in data.formTree"
          :key="f.id"
        ></component>
      </vue-draggable>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ElRow } from "element-plus";
import { ref, reactive, computed, watch, provide } from "vue";
import { FieldModeEnum } from "../utils/enum";
import { VueDraggable } from "vue-draggable-plus";
import { designComponentMap } from "../material";

const props = defineProps({
  data: Object,
});
// 提供字段模式上下文
provide("fieldMode", FieldModeEnum.design);

// 表单实例
const ruleFormRef = ref();

// 表单数据
const designForm = reactive({});

// 更新组件回调
const onUpdate = (e) => {
  console.log("元素更新", e);
};

// 删除组件回调
const onRemove = (e) => {
  console.log("元素移除", e);
};

// 删除组件
const removeEle = (field) => {
  console.log("元素删除");
};

// 复制组件
const copyEle = (field) => {};
</script>

<style lang="scss" scoped>
.center-form {
  flex: 1;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  // 表单设计相关的样式
  :deep(.drag-form) {
    height: 100%;
    padding: 0;
    overflow-x: hidden;
    overflow-y: auto;
    background: #f5f5f7;

    .dragger-row {
      position: relative;
      flex-wrap: wrap;
      align-content: flex-start;
      min-width: 500px;
      min-height: 100%;
      margin-top: -9px;
      padding: 36px 12px 480px;
      background: #fff;
    }

    // 单个col,单行的col会自动保持高度一致
    .single_col:hover > .single_col_content {
      background: #f5f6f8;
    }

    // 单个col的内容区域
    .single_col_content {
      padding: 7px 12px 12px;
      position: relative;
      width: 100%;
      min-height: 50px;
      box-sizing: border-box;

      // 单个col的操作按钮
      .single_col_cotnent_control {
        position: absolute;
        right: 0;
        background: #66b1ff;
        bottom: 0;
        z-index: 9;

        .oper {
          cursor: pointer;
          padding: 2px;
        }
      }
    }

    // 单个元素高亮
    :deep(.active_content) {
      background: #ebf8fb !important; // 选中时
    }

    // 占位元素
    .ghost-class {
      position: relative;

      &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 10;
        background: #fff;
        border: 1px dashed var(--el-color-primary);
        content: "";
      }
    }

    // 拖动时样式
    .drag-class {
      opacity: 0.2 !important;
    }
  }

  .drag-components-area {
    height: 100%;
    padding: 0;
    margin: 20px;
    box-shadow: 0px 6px 12px 1px rgba(12, 31, 80, 0.1);
    border-radius: 10px;
    align-items: flex-start;
    align-content: flex-start;
  }
}
</style>
