<template>
  <div class="form-design-wrapper">
    <!-- 新增顶部区域 -->
    <div class="form-design-header flex items-center justify-between p-3 border-b">
      <div class="form-title flex items-center">
        <el-input v-model="formConfig.title" placeholder="请输入表单名称" class="w-240px" />
      </div>
      <div class="form-actions flex gap-3">
        <el-button @click="clearForm" type="warning">清空</el-button>
        <el-button @click="previewForm" type="primary">预览</el-button>
        <el-button @click="saveForm" type="primary">保存</el-button>
      </div>
    </div>
    <!-- 原有设计区域 -->
    <div class="form-design-container flex">
      <left-material class="flex-basis-320px" :data="data" />
      <center-area class="flex-1" :data="data" />
      <right-prop-panel class="flex-basis-400px" :data="data" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import LeftMaterial from "./layout/left-material.vue";
import CenterArea from "./layout/center-area.vue";
import RightPropPanel from "./layout/right-prop-panel.vue";
import { ref, reactive, provide } from "vue";
import type { DraggableEvent, SortableEvent } from "vue-draggable-plus";
import type Sortable from "sortablejs";
import { materialList, type MaterialElement } from "./material";
import { keyBy } from "lodash-es";
import { ElMessage } from "element-plus";
import { instance } from "@/api/request";

// 当前选中的组件
const currentComponent = ref<any>(null);

// 表单配置数据
const formConfig = reactive({
  title: "未命名表单", // 新增表单标题
  components: [] as any[],
  formProps: {
    labelWidth: "120px",
    labelPosition: "right",
    size: "default",
  },
});
const id = "683b1836af11a9783c8644e1";
onMounted(async () => {
  let res = await instance.request({
    url: "/forms/" + id,
    method: "GET",
  });
  console.log("查看", res);
  data.fields = res.data.fields;
});

// 清空表单
const clearForm = () => {
  data.fields = [];
  data.activeField = null;
};

// 预览表单
const previewForm = () => {
  console.log("预览表单", { formConfig, fields: data.fields });
  // 这里可以实现预览逻辑，例如打开一个弹窗或者跳转到预览页面
  // TODO: 实现表单预览功能
};

const saveForm = async () => {
  console.log("保存表单", { formConfig, fields: data.fields });
  const d = {
    fields: data.fields,
    id,
  };
  console.log(d);

  await instance.request({
    url: "/forms" + "/" + id,
    method: "PUT",
    data: d,
  });

  ElMessage.success("表单已保存");
};

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
  onClone(element: MaterialElement) {
    return new element.class();
  },
  addFieldByClick(element: MaterialElement) {
    const field = data.onClone(element);
    data.fields.push(field);
    data.clickField(field);
  },
  centerGroup: {
    name: DRAG_NAME,
    // put(to: Sortable, from: Sortable, dragEl: HTMLElement, event: SortableEvent) {
    //   console.log("外部", to, from, dragEl, event);
    //   return true;
    // },
  },
  collapseGroup: {
    name: DRAG_NAME,
    // put(to: Sortable, from: Sortable, dragEl: HTMLElement, event: SortableEvent) {
    //   console.log("折叠", to, from, dragEl, event);
    // },
  },
  onAdd(event: DraggableEvent) {
    const field = event.clonedData;
    data.clickField(field);
  },
  clickField(field: any) {
    data.activeField = field;
  },
  deleteField(field: any) {
    const index = data.fields.indexOf(field);
    if (index > -1) {
      data.fields.splice(index, 1);
      data.activeField = null;
    }
  },
  copyField(field: any) {
    const mapping = keyBy(data.materialList, "type");
    const element = mapping[field.type] as MaterialElement;
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
.form-design-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  .form-design-header {
    background-color: #fff;
    border-bottom: 1px solid #e6e6e6;

    .form-title {
      font-size: 16px;
      font-weight: bold;
    }
  }

  .form-design-container {
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 560px;
    box-sizing: border-box;
    flex: 1;
  }
}
</style>
