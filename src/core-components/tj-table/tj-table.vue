<template>
  <div class="tj-table">
    <component :is="template" class="" v-for="template in components" :key="template.id" :tjTable="tjTable"></component>
  </div>
  123
</template>

<script lang="tsx" setup>
import { Permission } from "@/utils/permissions";
import { getDefaultComponents } from ".";
import { TjTable } from "./tj-table";
import { Field, Button } from "@/form-components/index";
import { nanoid } from "nanoid";

defineProps({
  // 渲染的组件。可以自行扩展，调整顺序
  components: {
    type: Array,
    default: () => getDefaultComponents(),
  },
});
console.log(nanoid());
window.nanoid = nanoid;

const fields = [
  Field.createJasInput("1", "姓名", { fixed: "left", required: true }),
  Field.createJasNumber("2", "年龄"),
  Field.createJasInput(nanoid(), "地址"),
  Field.createJasNumber(nanoid(), "电话"),
  Field.createJasInput(nanoid(), "邮箱"),
  Field.createJasNumber(nanoid(), "身份证号"),
  Field.createJasInput(nanoid(), "备注"),
  Field.createJasNumber(nanoid(), "分数", { fixed: "left" }),
];

const permisson = [Permission.ADD, Permission.EDIT, Permission.DELETE, Permission.EXPORT];
const tjTable = ref(
  new TjTable({
    fields,
    permisson,
    extraButtons: {
      toolbar: [],
      inline: [],
    },
  }),
);
console.log(tjTable.value);
</script>

<style lang="scss" scoped>
.tj-table {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>
