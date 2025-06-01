<template>
  <div :class="['design-container', { active: data.activeField === field }]" @click.stop="data.clickField(field)">
    <div class="collapse-header">
      {{ label }}
      <div class="collapse-header-actions">
        <div class="jas_oper_btn" v-if="data.activeField === field">
          <el-icon @click="data.copyField(field)"><CopyDocument /></el-icon>
          <el-icon @click="data.deleteField(field)"><Delete /></el-icon>
        </div>
      </div>
    </div>
    <div style="width: 100%; display: flex">
      <slot name="default"></slot>
    </div>
    <div style="height: 20px"></div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { Delete, CopyDocument } from "@element-plus/icons-vue";

const props = defineProps({
  field: Object,
  data: Object,
});

const label = computed(() => {
  return props.field.enabledProps.label ? props.field.label : "";
});

const emit = defineEmits(["click", "removeEle", "copyEle"]);
</script>

<style lang="scss" scoped>
.design-container {
  position: relative;
  &:hover {
    background-color: #f4f6f9;
  }
  &.active {
    background: #e7f8fb;
  }
  .collapse-header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    background-color: #f9f9f9;
    border-bottom: 1px solid #e0e0e0;
    font-weight: 500;
    margin-bottom: 8px;
    border-radius: 4px 4px 0 0;

    .collapse-header-actions {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      z-index: 100;

      .jas_oper_btn {
        display: flex;
        gap: 8px;
        overflow: hidden;
        white-space: nowrap;
        background: #fff;
        border-radius: 24px;
        padding: 3px 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

        .el-icon {
          cursor: pointer;
          font-size: 16px;

          &:hover {
            color: #409eff;
          }
        }
      }
    }
  }
}
</style>
