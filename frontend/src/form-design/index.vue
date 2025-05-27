<template>
  <div class="form-design-container flex">
    <left-material class="min-w-200px" :data="data" />
    <design-area class="flex-1" :data="data" />
    <right-prop-panel class="min-w-200px" />
  </div>
</template>

<script lang="ts" setup>
import LeftMaterial from "./layout/left-material.vue";
import DesignArea from "./layout/design-area.vue";
import RightPropPanel from "./layout/right-prop-panel.vue";
import { ref, reactive, provide } from "vue";
import type { SortableEvent } from "vue-draggable-plus";
import type Sortable from "sortablejs";
import { materialList } from "./material";
// 当前选中的组件
const currentComponent = ref(null);

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
  centerGroup: { name: DRAG_NAME },
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
