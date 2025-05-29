<template>
  <div class="form-design-container flex">
    <left-material class="min-w-200px" :data="data" />
    <center-area class="flex-1" :data="data" />
    <right-prop-panel class="min-w-400px" :data="data" />
  </div>
</template>

<script lang="ts" setup>
import LeftMaterial from "./layout/left-material.vue";
import CenterArea from "./layout/center-area.vue";
import RightPropPanel from "./layout/right-prop-panel.vue";
import { ref, reactive, provide } from "vue";
import type { DraggableEvent, SortableEvent } from "vue-draggable-plus";
import type Sortable from "sortablejs";
import { materialList } from "./material";
import { keyBy } from "lodash-es";
// 当前选中的组件
const currentComponent = ref(null);
const ss = ref();
// 表单配置数据
const formConfig = reactive({
  components: [],
  formProps: {
    labelWidth: "120px",
    labelPosition: "right",
    size: "default",
  },
});
const DRAG_NAME = Symbol("DRAG_NAME");
const data = reactive({
  materialList,
  fields: [],
  activeField: null,
  leftGroup: {
    name: DRAG_NAME,
    pull: (to: Sortable, from: Sortable, dragEl: HTMLElement, event: SortableEvent) => {
      return "clone";
      // return true;
    },
  },
  onClone(element: Record<"class" | "label", any>) {
    console.log("查看一下", element);
    return new element.class();
  },
  addFieldByClick(element) {
    const field = data.onClone(element);
    data.fields.push(field);
    data.clickField(field);
  },
  centerGroup: {
    name: DRAG_NAME,
  },
  onAdd(event: DraggableEvent) {
    const field = event.clonedData;
    data.clickField(field);
  },
  clickField(field) {
    data.activeField = field;
  },
  deleteField(field) {
    const index = data.fields.indexOf(field);
    if (index > -1) {
      data.fields.splice(index, 1);
      data.activeField = null;
    }
  },
  copyField(field) {
    const mapping = keyBy(data.materialList, "type");
    const element = mapping[field.type];
    const newField = data.onClone(element);
    data.fields.push(newField);
  },
});

// 设置当前选中的组件
const setCurrentComponent = (component: any) => {
  currentComponent.value = component;
};

// 将数据提供给子组件
const provideData = {
  formConfig,
  currentComponent,
  setCurrentComponent,
};

// 使用provide向子组件提供数据
provide("provideData", provideData);
</script>

<style lang="scss" scoped>
.form-design-container {
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 600px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}
</style>
