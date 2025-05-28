<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="组件属性" :disabled="!data.activeField" name="first">
      <component v-for="item in attrList" :is="item" :field="activeField" :key="item._name"> </component>
    </el-tab-pane>
    <el-tab-pane label="表单属性" name="second">
      <tj-1 title="字段显隐规则" show-switch @change="onChange">
        <add-rule-button subject="显隐规则"></add-rule-button>
      </tj-1>

      <tj-1 title="表单描述">
        <el-input type="textarea"></el-input>
      </tj-1>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { TabsPaneContext } from "element-plus";
import Tj1 from "@/components/el-wrap/tj-1.vue";
import { addRuleButton } from "@/components/add-rule-button/add-rule-button";
import TitleAttr from "../attrs/title-attr.vue";
import DescriptionAttr from "../attrs/description.attr.vue";

const props = defineProps({
  data: Object,
});
const activeName = ref("second");
const componentKey = ref(0);

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
const hiddenField = new props.data.materialList[0].class();
const activeField = computed(() => {
  return props.data.activeField || hiddenField;
});

function onChange(params: type) {
  console.log("变化了", params);
}
watch(
  () => activeField.value,
  () => {
    componentKey.value++;
  },
);
const attrList = computed(() => {
  const el = activeField.value;
  if (el.type === MaterialEnum.TjInput) {
    return [TitleAttr, DescriptionAttr];
  } else {
    return [DescriptionAttr, TitleAttr];
  }
});
</script>

<style lang="scss" scoped></style>
