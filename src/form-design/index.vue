<template>
  <div class="form-design-container">
    <ComponentList />
    <DesignArea />
    <PropertyPanel />
  </div>
</template>

<script lang="ts" setup>
import ComponentList from "./components/component-list.vue";
import DesignArea from "./components/design-area.vue";
import PropertyPanel from "./components/property-panel.vue";
import { ref, reactive, provide } from "vue";

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

// 设置当前选中的组件
const setCurrentComponent = (component) => {
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
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
