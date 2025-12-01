<template>
  <div class="jas-search" ref="searchContainer">
    <el-form :inline="true" :model="tjTable.searchParams" class="search-form">
      <el-row :gutter="20">
        <!-- 第一行字段（常用搜索条件）-->
        <el-col :key="`visible-${field.prop}`" v-for="(field, index) in layoutComputed.firstRow" :span="layoutComputed.fieldSpan">
          <el-form-item :label="field.label">
            <component :is="field.component" :field="field" :tjTable="tjTable" />
          </el-form-item>
        </el-col>

        <!-- 操作按钮区域（第一行最后） -->
        <el-col :span="layoutComputed.fieldSpan" class="search-buttons">
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="handleReset">重置</el-button>
            <el-button v-if="hasMoreFields" @click="toggleExpand">
              {{ expanded ? "收起" : "展开" }}
              <el-icon><ArrowUp v-if="expanded" /><ArrowDown v-else /></el-icon>
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 更多搜索条件（展开后显示）-->
      <template v-if="expanded && hasMoreFields">
        <el-row :gutter="20">
          <el-col :span="layoutComputed.fieldSpan" v-for="field in layoutComputed.moreFieldRows" :key="`more-${field.prop}`">
            <el-form-item :label="field.label">
              <component :is="field.component" :field="field" :tjTable="tjTable" />
            </el-form-item>
          </el-col>
        </el-row>
      </template>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { type ITjTable } from "../index";
import { type PropType, ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import { ArrowUp, ArrowDown } from "@element-plus/icons-vue";

const props = defineProps({
  tjTable: {
    type: Object as PropType<ITjTable>,
    required: true,
  },
});

// 容器相关引用和状态
const searchContainer = ref<HTMLElement | null>(null);
const containerWidth = ref(0);
const expanded = ref(false);

// 布局相关计算属性整合
const layoutComputed = computed(() => {
  // 计算每行最多容纳的字段数
  const width = containerWidth.value;
  const fieldsPerRow = Math.floor(width / 300); // 最多字段数（字段最小宽度）

  // 计算字段占用的span
  const fieldSpan = Math.floor(24 / (fieldsPerRow + 1)); // +1 为按钮区域预留空间
  const firstRow = props.tjTable.fields.slice(0, fieldsPerRow - 1);
  const moreFieldRows = props.tjTable.fields.slice(fieldsPerRow - 1);

  return {
    fieldSpan, //单个字段所占span
    firstRow, //第一行渲染的字段
    moreFieldRows, //第二行渲染的字段
  };
});

const hasMoreFields = computed(() => {
  return layoutComputed.value.moreFieldRows.length > 0;
});

// 动态计算容器宽度
function calculateContainerWidth() {
  if (!searchContainer.value) return;
  containerWidth.value = searchContainer.value.offsetWidth;
}

// 查询方法
function handleSearch() {
  props.tjTable.search?.();
}

// 重置方法
function handleReset() {
  props.tjTable.reset?.();
}

// 切换展开/收起状态
function toggleExpand() {
  expanded.value = !expanded.value;
}

// 监听窗口大小变化
onMounted(() => {
  calculateContainerWidth();
  window.addEventListener("resize", calculateContainerWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", calculateContainerWidth);
});

// 监听容器宽度变化
watch(containerWidth, () => {
  // 如果宽度变化，重新计算布局
  // 这里什么都不需要做，因为我们的计算属性会自动响应宽度变化
});
</script>

<style lang="scss" scoped>
.jas-search {
  padding: 16px 0;
  border-bottom: 1px solid #ebeef5;

  .search-form {
    width: 100%;
  }

  .search-buttons {
    text-align: right;
  }
}
</style>
