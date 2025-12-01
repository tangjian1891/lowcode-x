<template>
  <runtime-wrap :field="field">
    <el-button type="primary" icon="Document" @click="upload">
      {{ field?.fieldProps?.accept?.includes("image") ? "上传图片" : "上传文件" }}
    </el-button>
    <div v-if="form[field.id]?.length" class="img-list">
      <div v-for="(img, idx) in form[field.id]" :key="img.id + idx" class="img-item">
        <img v-if="img.id" :src="getImgUrl(img.id)" class="img-thumb" alt="图片" />
        <div class="img-info">
          <div class="img-name">{{ img.filename }}</div>
          <div class="img-size">{{ (img.size / 1024).toFixed(2) }} KB</div>
        </div>
      </div>
    </div>
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

function getImgUrl(id: string) {
  // 这里根据你的实际图片存储路径调整
  // 假设七牛云，返回完整图片访问地址
  return `${import.meta.env.VITE_QINIU_DOMAIN}/${id}` + "-thumb"; //缩略图
}
</script>

<style lang="scss" scoped>
.img-list {
  line-height: initial;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 16px;
}
.img-item {
  display: flex;
  align-items: center;
  width: 320px;
  background: #fafbfc;
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 12px 12px;
  gap: 12px;
}
.img-thumb {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
  background: #f0f0f0;
}
.img-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.img-name {
  font-size: 14px;
  color: #333;
  margin-bottom: 2px;
}
.img-size {
  font-size: 12px;
  color: #999;
}
</style>
