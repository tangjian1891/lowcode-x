<template>
  <design-container :field="field" :data="data">
    <el-date-picker type="datetime" placeholder="Select date and time" />
  </design-container>
</template>

<script lang="ts" setup>
import DesignContainer from "@/form-design/components/design-container/design-container.vue";

const props = defineProps({
  field: Object,
  data: Object,
});
</script>

<style lang="scss" scoped></style>
