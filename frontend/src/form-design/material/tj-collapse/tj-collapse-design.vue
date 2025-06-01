<template>
  <design-container :field="field" :data="data">
    <div class="tj-collapse">
      <vue-draggable class="drag-components-area" v-model="field.children" :group="data.centerGroup" @add="data.onAdd($event, field.children)">
        <component :field="f" :data="data" :is="designComponentMap[f.type]" v-for="f in field.children" :key="f.id"></component>
      </vue-draggable>
    </div>
  </design-container>
</template>

<script lang="ts" setup>
import DesignContainer from "@/form-design/components/design-container/design-container.vue";
import { VueDraggable } from "vue-draggable-plus";
import { designComponentMap } from "..";
const props = defineProps({
  field: Object,
  data: Object,
});
</script>

<style lang="scss" scoped></style>
