<template>
  <div class="form-design-wrapper">
    <!-- 新增顶部区域 -->
    <div class="form-design-header flex items-center justify-between p-3 border-b">
      <div class="form-title flex items-center">
        <el-button text icon="ArrowLeft" @click="$router.back()" class="mr-8px" />
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
import { cloneDeep, keyBy } from "lodash-es";
import { ElMessage } from "element-plus";
import { instance } from "@/api/request";
import { createDialog } from "@/tj-dialog";
import JasForm from "./jas-form.vue";

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
const route = useRoute();
const formId = route.params.formId as string;
onMounted(async () => {
  let res = await instance.request({
    url: "/forms/relateId/" + formId,
    method: "GET",
  });
  if (res) {
    data.fields = res.fields;
    data.formTree = res.formTree;
    data.id = res.id;
  }
});

// 清空表单
const clearForm = () => {
  data.fields = [];
  data.activeField = HIDDEN_FIELD;
  data.formTree = [];
};

// 预览表单
const previewForm = () => {
  const dialog = createDialog(
    JasForm,
    {
      formId,
      close() {
        dialog.close();
      },
    },
    {
      beforeClose() {},
    },
  );
  console.log(dialog);
};

const saveForm = async () => {
  console.log("保存表单", { formConfig, fields: data.fields });
  const d = {
    fields: data.fields,
    formTree: data.formTree,
    // id,
    id: data.id,
    relateId: formId,
  };
  console.log(d);

  await instance.request({
    url: "/forms",
    method: "POST",
    data: d,
  });

  ElMessage.success("表单已保存");
};

const DRAG_NAME = Symbol("DRAG_NAME");
const HIDDEN_FIELD = new materialList[0].class();
const data = reactive({
  HIDDEN_FIELD,
  activeId: HIDDEN_FIELD.id,
  fieldMapping: computed(() => {
    const allFields = [...data.fields, data.HIDDEN_FIELD];
    return keyBy(allFields, "id");
  }),
  activeField: computed(() => {
    return data.fieldMapping[data.activeId];
  }),
  materialList,
  fields: [],
  formTree: [],
  leftGroup: {
    name: DRAG_NAME,
    pull: (to: Sortable, from: Sortable, dragEl: HTMLElement, event: SortableEvent) => {
      return "clone";
    },
  },
  onClone(element: MaterialElement) {
    return new element.class();
  },
  addFieldByClick(element: MaterialElement) {
    console.log("触发了两次吗");

    const field = data.onClone(element);
    console.log(cloneDeep(field));

    data.addField2Design(field);
  },
  centerGroup: {
    name: DRAG_NAME,
  },
  collapseGroup: {
    name: DRAG_NAME,
  },
  onAdd(event: DraggableEvent) {
    const field = event.clonedData;
    data.addField2Design(field);
  },
  // 添加字段到设计区域
  addField2Design(field) {
    const newField = cloneDeep(field);
    data.fields.push(newField);
    utils.resetObjectProperties(field, ["id"]);
    data.clickField(field);
    data.formTree.push(field);
  },

  // 高亮
  clickField(field: { id: string }) {
    data.activeId = field.id;
  },
  // 删除元素
  deleteField(field: any) {
    const parent = utils.findParentNode(data.formTree, field.id) as any[];
    const index = parent.findIndex((item) => item.id === field.id);
    if (index > -1) {
      // 从树中移除
      parent.splice(index, 1);
      // 从组件中移除fields
      const idx = data.fields.indexOf(field);
      if (idx > -1) {
        data.fields.splice(idx, 1);
      }
      // 高亮
      data.clickField(data.HIDDEN_FIELD);
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
