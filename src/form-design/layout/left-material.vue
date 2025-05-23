<template>
  <div class="group-list">
    <!-- 快捷查询组件 -->
    <div class="search-group">
      <el-input v-model="searchValue" placeholder="搜索组件" prefix-icon="Search" clearable />
    </div>

    <!-- 组件区 -->
    <div class="content-group">
      <!-- 组件列表区域 -->
      <vue-draggable :group="data.leftGroup" class="component-list" v-model="filteredMaterials">
        <li v-for="element in filteredMaterials" :key="element.id" class="material-item">
          <span>{{ element.name }}</span>
        </li>
      </vue-draggable>
      <!-- 无匹配数据 -->
      <el-divider border-style="dashed" style="margin: 12px 0">
        <span style="color: #b5b8be; font-size: 13px">暂无匹配组件</span>
      </el-divider>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { MaterialEnum } from "@/enums/material-enum";
import { VueDraggable } from "vue-draggable-plus";
const props = defineProps({
  data: Object,
});
// 定义属性
const searchValue = ref("");
const filteredMaterials = ref([
  {
    name: "Joao",
    id: "1",
  },
  {
    name: "Jean",
    id: "2",
  },
  {
    name: "Johanna",
    id: "3",
  },
  {
    name: "Juan",
    id: "4",
  },
]);
</script>

<style lang="scss" scoped>
.group-list {
  transition: width 0.8s;
  padding: 0 1px;
  border-right: 1px solid #e6e6e6;
  overflow: hidden;
  height: 100%;

  .search-group {
    padding: 12px;
    border-bottom: 1px solid #ddd;
  }

  .content-group {
    height: calc(100% - 57px);
    overflow: auto;

    .group-item .title {
      padding: 8px 12px;
      font-size: 14px;
      font-weight: 700;
      color: #000;
      text-align: left;
    }

    .component-list {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      padding: 0 10px 10px;
      margin: 0;
      overflow: hidden;
    }
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
  width: 46%;
  line-height: 26px;
  padding: 4px;
  color: #333;
  text-align: left;

  a {
    display: flex;
    align-items: center;
    border-radius: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background: #fff;
    border: 1px solid #d7d9dc;
    padding: 0 10px;
    user-select: none;
    cursor: pointer;

    &:hover {
      color: var(--el-color-primary);
      border: 1px dashed var(--el-color-primary);
    }
  }
}
</style>
