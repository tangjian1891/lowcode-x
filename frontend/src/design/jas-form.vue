<template>
  <el-form :model="form">
    <el-row class="form-row">
      <component
        :form="form"
        :field="fieldMapping[f.id]"
        :data="data"
        :is="runtimeComponentMap[fieldMapping[f.id].type]"
        v-for="f in data.formTree"
        :key="f.id"
      />
    </el-row>
  </el-form>
  <div class="flex justify-end" v-if="componentOptions.showFooter">
    <el-button type="primary" @click="handleSave">保存</el-button>
    <el-button @click="componentOptions.close">取消</el-button>
  </div>
</template>

<script lang="ts" setup>
import { keyBy } from "lodash-es";
import { runtimeComponentMap } from "./material";
import { ElMessage } from "element-plus";
import { instance } from "@/api/request";
const props = defineProps({
  componentOptions: Object,
});
const data = reactive({
  fields: [],
  formTree: [],
});
onMounted(async () => {
  const { formId, id } = props.componentOptions;
  let res = await instance.request({
    url: "/forms/relateId/" + formId,
    method: "GET",
  });
  Object.assign(data, res);
  let res2 = await api.form.getDataById(formId, id);
  console.log(res2);
  Object.assign(form, res2);
});

const fieldMapping = computed(() => {
  return keyBy(data.fields, "id");
});

const form = reactive({});
async function handleSave() {
  const res = await instance({
    url: `/forms/${props.componentOptions.formId}/data`,
    method: "POST",
    data: form,
  });
  ElMessage.success("保存成功");
  props.componentOptions.close();
  if (props.componentOptions.tjTable) {
    props.componentOptions.tjTable.refresh();
  }
}
</script>

<style lang="scss" scoped>
.form-row {
  align-items: flex-start;
  align-content: flex-start;
}
</style>
