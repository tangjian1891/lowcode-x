<template>
  <tj-1 title="字段宽度" v-model="field.formItemProps.description">
    <el-radio-group v-if="field" v-model="field.layoutProps.type" @change="onChange">
      <el-radio-button v-for="(item, index) in typeOptions" :value="item.value" :key="index">
        {{ item.label }}
      </el-radio-button>
    </el-radio-group>
    <div class="mt-6px" v-if="field">
      <el-radio-group v-model="field.layoutProps.value" v-if="field.layoutProps.type === FieldWidthType.FixedPercentage">
        <el-radio-button v-for="(item, index) in defaultOptions" :value="item.value" :key="index">
          {{ item.label }}
        </el-radio-button>
      </el-radio-group>
      <el-input-number
        v-else-if="field.layoutProps.type === FieldWidthType.CustomPercentage"
        v-model="field.layoutProps.value"
        :min="1"
        :max="100"
        :controls="false"
      />
      <el-input-number v-else-if="field.layoutProps.type === FieldWidthType.Pixel" v-model="field.layoutProps.value" :min="0" :controls="false" />
    </div>
  </tj-1>
</template>

<script lang="ts" setup>
import Tj1 from "@/components/el-wrap/tj-1.vue";
const props = defineProps({
  field: Object,
});
const typeOptions = [
  {
    label: "单行列数",
    value: FieldWidthType.FixedPercentage,
  },
  {
    label: "固定宽度",
    value: FieldWidthType.Pixel,
  },
  {
    label: "自定义百分比",
    value: FieldWidthType.CustomPercentage,
  },
];
const defaultOptions = [
  {
    label: "1/4",
    value: 6,
  },
  {
    label: "1/3",
    value: 8,
  },
  {
    label: "1/2",
    value: 12,
  },
  {
    label: "2/3",
    value: 16,
  },
  {
    label: "3/4",
    value: 18,
  },
  {
    label: "整行",
    value: 24,
  },
];

function onChange(e: FieldWidthType) {
  if (e === FieldWidthType.FixedPercentage) {
    props.field!.layoutProps.value = 24;
  } else if (e === FieldWidthType.Pixel) {
    props.field!.layoutProps.value = 500;
  } else if (e === FieldWidthType.CustomPercentage) {
    props.field!.layoutProps.value = 100;
  }
}
</script>

<style lang="scss" scoped></style>
