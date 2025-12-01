<template>
  <tj-1 title="校验">
    <el-checkbox v-model="field.validateProps.required">必填</el-checkbox><br />
    <el-checkbox v-model="field.validateProps.unique">不允许重复值</el-checkbox><br />
    <el-checkbox v-model="field.enabledProps.decimal">
      <span>保留小数位数</span>
    </el-checkbox>
    <el-input-number v-show="field.enabledProps.decimal" class="ml-12px" v-model="field.validateProps.decimal" :min="0" :max="8" />
    <br />
    <el-checkbox v-model="field.enabledProps.range">限定数值范围</el-checkbox>
    <div class="flex items-center mt-6px" v-show="field.enabledProps.range">
      <el-input v-model="field.validateProps.min" class="w-160px"></el-input>
      <span class="mx-8px font-bold">~</span>
      <el-input v-model="field.validateProps.max" class="w-160px"></el-input>
    </div>
  </tj-1>
</template>

<script lang="ts" setup>
import Tj1 from "@/components/el-wrap/tj-1.vue";
const props = defineProps({
  field: { type: Object, required: true },
});
</script>
