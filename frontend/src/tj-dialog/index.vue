<template>
  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="500"
    :before-close="dialogOptions.beforeClose"
    @close="dialogOptions.close"
    :style="{ ...styleVarComp }"
  >
    <component ref="dialogContentRef" :componentOptions="componentOptions" :is="component"></component>
  </el-dialog>
</template>

<!-- 
1.第一种情况
用户点击关闭按钮/遮罩区域。  自动调用 before-close
before-close
close 关闭前的回调  (before-close通过的情况下触发， 是关闭前 close竟然不是change事件)
update:modelValue触发，正式关闭。

2.第二种情况
手动将 dialogVisible 设置false。随后触发触发 close 关闭前的回调。 （不要这么做，会造成逻辑不一致，虽然也会触发close。）

总结：
1.业务代码：不允许直接调用  dialogVisible=false 只能通过暴露的close和checkAndClose方法来关闭。
2.业务上需要校验handleClose，直接 defineExpose 暴露即可

-->

<script lang="ts" setup>
import { DialogSizeEnum, dialogSizeMapping } from "./index";
defineOptions({
  inheritAttrs: false,
  name: "jas-dialog",
});

const emit = defineEmits(["close", "confirm"]);
const dialogVisible = ref(true);
const dialogContentRef = ref();
const props = defineProps({
  component: [Object, Function],
  componentOptions: {
    type: Object,
  },
  dialogOptions: Object,
  size: {
    type: Number,
    default: () => {
      return DialogSizeEnum.w960;
    },
  },
});

const styleVarComp = computed(() => {
  const obj = dialogSizeMapping[props.size];
  if (props.height) {
    obj["--height"] = props.height;
  }
  return obj;
});

watch(
  () => dialogVisible.value,
  (newVal) => {
    if (!newVal) {
      setTimeout(() => {
        emit("close");
      }, 0);
    }
  },
);
</script>

<style lang="scss" scoped></style>
