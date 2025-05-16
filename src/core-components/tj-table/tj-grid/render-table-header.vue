<template>
  <el-popover class="box-item" content="Top Left prompts info" placement="bottom" trigger="click" :persistent="false" :hide-after="0">
    <template #reference>
      <div class="custom-table-header" @click="onClick">
        <span class="custom-slot-header-title">{{ title }} </span>
        <span class="custom-slot-header-icon1">
          <el-icon><SortDown /></el-icon>
          <el-icon><SortUp /></el-icon>
        </span>
        <span class="custom-slot-header-icon2">
          <el-icon><Filter /></el-icon>
        </span>
      </div>
    </template>
  </el-popover>
</template>

<script lang="ts" setup>
const props = defineProps({
  data: Object,
});
console.log("内部渲染多少次", props.data);

function onClick() {
  console.log("点击了");
}
const title = computed(() => {
  return props.data.column.title;
});
</script>

<style lang="scss">
.qwer > .vxe-cell {
  display: block;
  & > .vxe-cell--wrapper {
    display: block;
  }
  .vxe-cell--wrapper {
    height: 100%;
    width: 100%;
    display: block;
    .vxe-cell--title {
      height: 100%;
      width: 100%;
      display: block;
      .custom-table-header {
        cursor: pointer;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        .custom-slot-header-title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
