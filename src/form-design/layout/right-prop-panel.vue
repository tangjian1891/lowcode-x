<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="组件属性" name="first">User</el-tab-pane>
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

const activeName = ref("second");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};

function onChange(params: type) {
  console.log("变化了", params);
}
</script>

<style lang="scss" scoped></style>
