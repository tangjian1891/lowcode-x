<template>
  <tj-1 title="值">
    <el-select v-model="field.valueProps.type">
      <el-option v-for="option in valueOptions" :key="option.value" :label="option.label" :value="option.value" />
    </el-select>
    <div class="mt-6px" v-if="field.valueProps.type === ValueEnum.Default">
      <el-input placeholder="请输入默认值" v-model="field.valueProps.value"></el-input>
    </div>
    <add-rule-button v-else-if="field.valueProps.type === ValueEnum.LinkedField" class="mt-6px" subject="规则"> </add-rule-button>
  </tj-1>
</template>

<script lang="ts" setup>
import Tj1 from "@/components/el-wrap/tj-1.vue";
const props = defineProps({
  field: Object,
});

const valueOptions = [
  { label: "默认值", value: ValueEnum.Default },
  { label: "关联字段", value: ValueEnum.LinkedField },
];
</script>

<style lang="scss" scoped></style>
