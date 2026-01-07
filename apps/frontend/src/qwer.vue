<template>
  <div>这是一个弹窗</div>

  <Teleport :to="'#' + appDialog.teleportId">
    <el-button>删除啊</el-button>
  </Teleport>
</template>

<script lang="ts" setup>
import { AppDialog } from "./AppUI/AppDialog/AppDialog";

defineProps({
  appDialog: {
    type: AppDialog,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
