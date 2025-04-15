<template>
  <el-dialog v-model="dialogVisible" title="Tips" width="500" :before-close="handleClose">
    <component
      :jasTable="jasTable"
      :is="component ?? JasForm"
      @close="emit('close')"
      @confirm="emit('confirm')"
    ></component>

    <!-- <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false"> Confirm </el-button>
      </div>
    </template> -->
  </el-dialog>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import JasForm from '../jas-form/jas-form.vue'
import { type IJasTable } from '../jas-page'
defineOptions({
  inheritAttrs: false,
  name: 'jas-dialog',
})
const emit = defineEmits(['close', 'confirm'])
const dialogVisible = ref(true)
const props = defineProps({
  component: Object,
  jasTable: {
    type: Object as PropType<IJasTable>,
    required: true,
  },
})
console.log('看一眼', props)

function handleClose(params: type) {}
</script>

<style lang="scss" scoped></style>
