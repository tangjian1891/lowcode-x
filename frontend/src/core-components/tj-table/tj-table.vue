<template>
  <div v-if="tjTable" :class="['tj-table', { fullscreen: tjTable.isFullscreen }]" v-loading="tjTable.dataLoading">
    <component v-for="(template, index) in components" :key="index" :is="template" :tjTable="tjTable" />
  </div>
</template>

<script lang="tsx" setup>
import { Permission } from "@/utils/permissions";
import { getDefaultComponents } from ".";
import { TjTable } from "./tj-table";
import { api } from "@/api";

const props = defineProps({
  // 渲染的组件。可以自行扩展，调整顺序
  components: {
    type: Array,
    default: () => getDefaultComponents(),
  },
  menu: {
    type: Object,
  },
});

const permisson = [Permission.ADD, Permission.EDIT, Permission.DELETE, Permission.EXPORT];
const tjTable = ref();

onMounted(async () => {
  if (!props.menu?.id) {
    console.error("Menu ID is required");
    return;
  }
  try {
    // 获取表单配置
    const formConfigResponse = await api.form.getDataByMenuId(props.menu.id);
    const formConfig = formConfigResponse as any; // 临时处理类型
    console.log("获取到菜单数据了", formConfig);

    // 初始化 TjTable 实例
    tjTable.value = new TjTable({
      fields: formConfig.fields || [],
      permisson,
      menuId: props.menu.id,
      extraButtons: {
        toolbar: [],
        inline: [],
      },
    });

    // 加载表格数据
    await tjTable.value.loadData();
    console.log("看下数据", tjTable.value.data);
  } catch (error) {
    console.error("初始化表格失败:", error);
  }
});

// 暴露刷新方法供其他组件使用
defineExpose({
  refresh: () => tjTable.value?.refresh(),
  reset: () => tjTable.value?.reset(),
  loadData: () => tjTable.value?.loadData(),
});
</script>

<style lang="scss" scoped>
.tj-table {
  background: white;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>
