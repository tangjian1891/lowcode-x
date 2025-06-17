<template>
  <runtime-wrap :field="field">
    <el-button type="primary" icon="Document" @click="upload">
      {{ field?.fieldProps?.accept?.includes("image") ? "上传图片" : "上传文件" }}
    </el-button>
  </runtime-wrap>
</template>

<script lang="ts" setup>
import { instance } from "@/api/request";
import { RuntimeWrap } from "@/design/components/wrap-container";
import * as qiniu from "qiniu-js";
const props = defineProps({
  form: Object,
  field: Object,
});

function upload(params: type) {
  const input = document.createElement("input");
  input.type = "file";
  input.style.display = "none";
  input.accept = props.field?.fieldProps?.accept || "";
  document.body.appendChild(input);
  input.click();
  input.addEventListener("change", async (event: Event) => {
    const files = (event.target as HTMLInputElement).files;
    console.log("选择的文件", files);

    let token = await instance.get("upload/certificate");
    const promiseList = [...files].map((file) => {
      return new Promise((resolve) => {
        const observable = qiniu.upload(file, null, token);
        observable.subscribe({
          next: (res) => {
            console.log("上传进度", res);
          },
          error: (err) => {
            console.error("上传失败", err);
          },
          complete: (res) => {
            console.log("上传完成", res);
            // 这里可以处理上传完成后的逻辑，比如更新表单数据
            resolve({
              id: res.key,
              filename: file.name,
              size: file.size,
              type: file.type,
            });
            // props.form[props.field.fieldProps.name] = res.key; // 假设返回的key是文件的唯一标识
          },
        });
        resolve;
      });
    });

    const list = await Promise.all(promiseList);
    props.form[props.field.id] ??= [];
    props.form[props.field.id].push(...list);
    console.log("获取到了", props.form[props.field.id]);

    // 这里可以处理文件上传逻辑
    document.body.removeChild(input);
  });
}
</script>

<style lang="scss" scoped></style>
