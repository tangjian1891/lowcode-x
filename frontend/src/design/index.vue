<template>
  <div class="form-design-wrapper">
    <!-- 新增顶部区域 -->
    <div class="form-design-header flex items-center justify-between p-3 border-b">
      <div class="form-title flex items-center">
        <el-button text icon="ArrowLeft" @click="$router.back()" class="mr-8px" />
        <el-input v-model="systemInfo.name" placeholder="请输入表单名称" class="w-240px" />
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
const DRAG_NAME = Symbol("DRAG_NAME");
const route = useRoute();
const menuId = route.params.menuId as string;
const systemInfo = ref({});
// 表单的配置
const formConfig = ref({
  fields: [],
  formTree: [],
  formProps: {
    labelWidth: "120px",
    labelPosition: "right",
    size: "default",
  },
});
const HIDDEN_FIELD = new materialList[0].class();
const data = reactive({
  formConfig,
  // ------------ 表单设计运用到的 ------------
  variables: {
    // 右侧配置，隐藏的那个字段
    HIDDEN_FIELD,
    // 设计区域的字段
    materialList,
    // 字段的映射
    fieldMapping: computed(() => {
      const allFields = [...data.formConfig.fields, data.variables.HIDDEN_FIELD];
      return keyBy(allFields, "id");
    }),
    // 当前高亮的字段
    activeId: HIDDEN_FIELD.id,
    // 当前高亮的字段
    activeField: computed(() => {
      return data.variables.fieldMapping[data.variables.activeId];
    }),
    // 左侧拖拽组
    leftGroup: {
      name: DRAG_NAME,
      pull: (to: Sortable, from: Sortable, dragEl: HTMLElement, event: SortableEvent) => {
        return "clone";
      },
    },
    // 中间设计区域的拖拽组
    centerGroup: {
      name: DRAG_NAME,
    },
    // 折叠的拖拽组
    collapseGroup: {
      name: DRAG_NAME,
    },
  },
  methods: {
    // 克隆元素
    onClone(element: MaterialElement) {
      return new element.class();
    },
    // 添加字段到设计区域
    addFieldByClick(element: MaterialElement) {
      const field = data.onClone(element);
      data.methods.addField2Design(field);
    },
    // 添加字段到设计区域
    onAdd(event: DraggableEvent) {
      const field = event.clonedData;
      data.methods.addField2Design(field);
    },
    // 添加字段到设计区域
    addField2Design(field) {
      console.log("添加了 ", field);

      const newField = cloneDeep(field);
      data.formConfig.fields.push(newField);
      utils.resetObjectProperties(field, ["id"]);
      data.methods.clickField(field);
    },
    // 高亮
    clickField(field: { id: string }) {
      data.variables.activeId = field.id;
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
    // 复制元素
    copyField(field: any) {
      console.log("复制元素", field);

      const mapping = keyBy(data.variables.materialList, "type");
      const element = mapping[field.type] as MaterialElement;
      const newField = data.methods.onClone(element);
      data.formConfig.fields.push(newField);
    },
  },
});

onMounted(async () => {
  const res = await api.menu.info(menuId);
  systemInfo.value = res;
  if (res.value) {
    formConfig.value = res.value;
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
      menuId,
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
    relateId: menuId,
  };
  console.log(d);

  await instance.request({
    url: "/forms",
    method: "POST",
    data: d,
  });

  ElMessage.success("表单已保存");
};

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
