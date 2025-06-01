<template>
  <design-container :field="field" :data="data" :mask="false">
    <vue-draggable
      class="tj-collapse h-full w-full min-h400px"
      v-model="field.children"
      :group="data.collapseGroup"
      @add="data.onAdd($event, field.children)"
      @remove="onRemove"
    >
      <component :field="f" :data="data" :is="designComponentMap[f.type]" v-for="f in field.children" :key="f.id"></component>
    </vue-draggable>
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

function onRemove(params: type) {
  console.log("出去了");
}
</script>

<style lang="scss" scoped></style>
