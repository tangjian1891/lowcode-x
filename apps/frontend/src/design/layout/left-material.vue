<template>
  <div class="group-list pt-12px">
    <!-- 组件区 -->
    <vue-draggable :group="data.variables.leftGroup" class="component-list" v-model="data.variables.materialList" :clone="data.methods.onClone">
      <li
        v-for="element in data.variables.materialList"
        :key="element.id"
        class="material-item"
        :class="{ highlight: element.highlight }"
        @click="data.methods.addFieldByClick(element)"
      >
        <i v-if="element.icon" class="material-icon" :class="element.icon"></i>
        <span>{{ element.label }}</span>
      </li>
    </vue-draggable>
  </div>
</template>

<script lang="ts" setup>
import { VueDraggable } from "vue-draggable-plus";
const props = defineProps({
  data: Object,
});
</script>

<style lang="scss" scoped>
.group-list {
  transition: width 0.8s;
  border-right: 1px solid #e6e6e6;
  overflow: hidden;
  height: 100%;
  .component-list {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0 10px 10px;
    margin: 0;
    overflow: hidden;
    gap: 10px;
  }

  // 滚动条样式
  ::-webkit-scrollbar {
    width: 3px;
    &-track {
      border-radius: 3px;
      background: gainsboro;
    }
    &-thumb {
      border-radius: 3px;
      background: #c2c2c2;
    }
  }
}

// 组件项样式
.material-item {
  font-size: 12px;
  width: 120px;
  line-height: 32px;
  color: #333;
  text-align: left;

  display: flex;
  align-items: center;
  border-radius: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: #fff;
  border: 1px solid #e4e7ed;
  padding: 0 10px;
  user-select: none;
  cursor: pointer;
  margin: 0;

  &:hover {
    color: var(--el-color-primary);
    border: 1px dashed var(--el-color-primary);
  }

  &.highlight {
    background-color: #f0f8ff;
    border: 1px dashed #91caff;
  }

  .material-icon {
    margin-right: 8px;
    font-size: 16px;
    line-height: 1;
  }
}
</style>
