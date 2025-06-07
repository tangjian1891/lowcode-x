<template>
  <el-col
    :style="{ '--width': width }"
    :class="['design-container', { active: data.activeField.id === field.id }]"
    @click.stop="data.clickField(field)"
  >
    <el-form-item :label="label" :required="field.validateProps.required">
      <template #label="{ label }">
        <div>
          <!-- <label-before-mark v-if="field" :field="field"></label-before-mark> -->
        </div>
        {{ label }}
        <div v-if="field.showDescription">
          <el-icon><QuestionFilled /></el-icon>
        </div>
        <div v-if="!field.visible">
          <el-icon class="icon-eye" v-show="!props.visible">
            <Hide />
          </el-icon>
        </div>
      </template>
      <div style="width: 100%; display: flex">
        <slot name="default"></slot>
      </div>
      <p v-if="field.showDescription" class="field-description" v-html="description"></p>
    </el-form-item>
    <div style="height: 20px"></div>
    <div class="mask" v-if="mask">
      <div class="jas_oper_btn" v-if="data.activeField === field">
        <el-icon @click.stop="data.copyField(field)"><CopyDocument /></el-icon>
        <el-icon @click.stop="data.deleteField(field)"><Delete /></el-icon>
      </div>
    </div>
  </el-col>
</template>

<script lang="ts" setup>
const props = defineProps({
  field: Object,
  data: Object,
  mask: {
    type: Boolean,
    default: true,
  },
});

const label = computed(() => {
  return props.field.enabledProps.label ? props.field.formItemProps.label : "";
});
const description = computed(() => {
  return unescape(props.field.description ?? "");
});

const width = computed(() => {
  const { type, value } = props.field.layoutProps;
  if (type === FieldWidthEnum.Pixel) {
    return value + "px";
  } else if (type === FieldWidthEnum.FixedPercentage) {
    return (100 / 24) * value + "%";
  } else if (type === FieldWidthEnum.CustomPercentage) {
    return value + "%";
  }
});

const emit = defineEmits(["click", "removeEle", "copyEle"]);
</script>

<style lang="scss" scoped>
.design-container {
  max-width: var(--width);
  flex: 0 0 var(--width);
  position: relative;
  &.active {
    background: #e7f8fb;
  }
  :deep(.el-form-item) {
    margin-bottom: 0;
    &.el-form-item--label-right,
    &.el-form-item--label-left {
      .el-form-item__label {
        line-height: 32px;
        min-height: 32px;
      }
    }
    &.el-form-item--label-top {
      .el-form-item__label {
        line-height: 30px;
        min-height: 30px;
        margin-bottom: 0;
        align-items: flex-start;
      }
    }
    .el-form-item__label {
      word-break: break-all;
    }
  }
  .mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: transparent;
    z-index: 100;
    .jas_oper_btn {
      position: absolute;
      top: 6px;
      z-index: 10;
      right: 0;
      margin: 0 5px;
      overflow: hidden;
      white-space: nowrap;
      background: #fff;
      border-radius: 24px;
    }
  }
}
</style>
