<template>
  <el-form-item :label="props.field.formItemProps.label" :prop="props.field.formItemProps.prop" v-if="props.field.authProps.visible">
    <template #label v-if="props.field.enabledProps.label">
      <span>{{ props.field.formItemProps.label }}</span>
    </template>
    <el-select
      v-model="model"
      v-bind="props.field.fieldProps"
      :disabled="!props.field.authProps.enabled || props.field.fieldProps.disabled"
      :placeholder="props.field.fieldProps.placeholder"
    >
      <el-option v-for="option in props.field.options" :key="option.value" :label="option.label" :value="option.value" :disabled="option.disabled">
      </el-option>
    </el-select>
    <template v-if="props.field.enabledProps.description && props.field.formItemProps.description">
      <div class="form-item-description">{{ props.field.formItemProps.description }}</div>
    </template>
  </el-form-item>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  field: {
    type: Object,
    required: true,
  },
  modelValue: {
    type: [String, Number, Array, Object],
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

// 处理默认值
const model = computed({
  get() {
    // 如果外部传入了值，优先使用外部值
    if (props.modelValue !== undefined && props.modelValue !== null && props.modelValue !== "") {
      return props.modelValue;
    }

    // 使用配置的默认值
    if (props.field.valueProps.value !== undefined) {
      return props.field.valueProps.value;
    }

    // 否则返回空值
    return props.field.fieldProps.multiple ? [] : "";
  },
  set(val) {
    emit("update:modelValue", val);
  },
});
</script>

<style scoped>
.form-item-description {
  font-size: 12px;
  color: #999;
  margin-top: 2px;
}
</style>
