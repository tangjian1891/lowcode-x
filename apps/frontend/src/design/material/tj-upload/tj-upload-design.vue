<template>
  <design-wrap :field="field" :data="data">
    <el-button type="primary" icon="Document">
      {{ field?.fieldProps?.accept?.includes("image") ? "上传图片" : "上传文件" }}
    </el-button>
  </design-wrap>
</template>

<script lang="ts" setup>
import { DesignWrap } from "@/design/components/wrap-container";
const props = defineProps({
  field: Object,
  data: Object,
});
</script>

<style lang="scss" scoped></style>
