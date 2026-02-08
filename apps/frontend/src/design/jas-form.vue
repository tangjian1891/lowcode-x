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
  <div class="flex justify-end">
    <el-button type="primary" @click="handleSave">保存</el-button>
    <el-button @click="dialogInstance.close()">取消</el-button>
  </div>
</template>

<script lang="ts" setup>
import { isNil, keyBy } from "lodash-es";
import { runtimeComponentMap } from "./material";
import { ElMessage } from "element-plus";
import { instance } from "@/api/request";
const props = defineProps({
  dialogInstance: Object,
  formId: String,
  id: String,
  mode: String,
});
const data = reactive({
  fields: [],
  formTree: [],
});
onMounted(async () => {
  const { formId, id } = props;
  const menu = await api.menu.info(formId);

  Object.assign(data, menu.value);
  if (!isNil(id)) {
    let res2 = await api.formData.get(id);
    console.log(res2);
    Object.assign(form, res2);
  }

  if (props.mode === "detail") {
    // 详情模式下的逻辑
    data.fields.forEach((field) => {
      field.authProps.enabled = false;
    });
  }
});

const fieldMapping = computed(() => {
  return keyBy(data.fields, "id");
});

const form = reactive({});
async function handleSave() {
  await api.formData.save(form);
  ElMessage.success("保存成功");
  props.dialogInstance.onRefresh();
  props.dialogInstance.close();
}
</script>

<style lang="scss" scoped>
.form-row {
  align-items: flex-start;
  align-content: flex-start;
}
</style>
