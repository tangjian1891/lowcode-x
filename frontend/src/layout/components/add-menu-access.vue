<template>
  <div class="w-full h-full flex items-center justify-center">
    <div class="menu-cards">
      <div class="menu-card directory" @click="handleAddDirectory">
        <div class="icon-container">
          <el-icon color="#4CAF50" :size="32">
            <Folder />
          </el-icon>
        </div>
        <div class="card-title">新增目录</div>
      </div>

      <div class="menu-card menu" @click="handleAddMenu">
        <div class="icon-container">
          <el-icon color="#9575CD" :size="32">
            <Menu />
          </el-icon>
        </div>
        <div class="card-title">新增菜单</div>
      </div>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { ElMessage, type FormContext, type FormInstance, ElForm } from "element-plus";
import { Folder, Menu } from "@element-plus/icons-vue";
import { createDialog } from "@/tj-dialog";

const emit = defineEmits(["add-directory", "add-menu"]);

const handleAddDirectory = () => {
  emit("add-directory");
  console.log(qwer);

  createDialog({}, qwer);

  ElMessage.success("即将创建新目录");
};

const handleAddMenu = () => {
  createDialog({}, qwer);
  emit("add-menu");
  ElMessage.success("即将创建新菜单");
};
</script>

<script lang="tsx">
import { ref, defineComponent, watch } from "vue";
import { MenuType, SubMenuType } from "../index";
import { instance } from "@/api/request";

const qwer = defineComponent({
  name: "add-menu-dialog",
  setup(props, ctx) {
    const menuTree = ref([]);
    onMounted(async () => {
      const res = await instance.request({
        url: "/menu",
        method: "GET",
      });
      menuTree.value = res.data;
    });
    const form = ref({
      name: "",
      type: MenuType.FOLDER,
      subType: null as SubMenuType | null,
      value: "",
      icon: "",
      parentId: "",
      order: 0,
    });
    const formRef = useTemplateRef<FormInstance>("formRef");

    // 监听菜单类型变化，自动设置子类型
    watch(
      () => form.value.type,
      (newType) => {
        if (newType === MenuType.FOLDER || newType === MenuType.PERMISSION) {
          form.value.subType = null;
        } else if (newType === MenuType.MENU && !form.value.subType) {
          form.value.subType = SubMenuType.INTERNAL;
        }
      },
    );

    const menuTypeOptions = [
      { label: "目录", value: MenuType.FOLDER },
      { label: "菜单", value: MenuType.MENU },
    ];

    const subMenuTypeOptions = [
      { label: "通用表单", value: SubMenuType.GENERAL_FORM },
      { label: "自定义表单", value: SubMenuType.INTERNAL },
      { label: "外部菜单", value: SubMenuType.EXTERNAL_MENU },
    ];

    async function onConfirm() {
      console.log(formRef.value);
      formRef.value!.validate(async (flag) => {
        if (flag) {
          const res = await instance.request({
            url: "/menu",
            method: "POST",
            data: form.value,
          });
          console.log("保存成功");
          ctx.emit("close");
        }
      });
    }

    function foo(val) {
      // (val) => ()
      console.log("这是啥啊", val);

      form.value.parentId = val;
    }
    return () => {
      return (
        <el-form model={form.value} label-width="100px" style="max-width: 600px;" ref="formRef">
          <el-form-item label="菜单名称" required prop="name">
            <el-input modelValue={form.value.name} onUpdate:modelValue={(val) => (form.value.name = val)} placeholder="请输入菜单名称" />
          </el-form-item>

          <el-form-item label="菜单类型" required prop="type">
            <el-select modelValue={form.value.type} onUpdate:modelValue={(val) => (form.value.type = val)} placeholder="请选择菜单类型">
              {menuTypeOptions.map((option) => (
                <el-option key={option.value} label={option.label} value={option.value} />
              ))}
            </el-select>
          </el-form-item>

          {form.value.type === MenuType.MENU && (
            <el-form-item label="菜单子类型" prop="subType">
              <el-select modelValue={form.value.subType} onUpdate:modelValue={(val) => (form.value.subType = val)} placeholder="请选择菜单子类型">
                {subMenuTypeOptions.map((option) => (
                  <el-option key={option.value} label={option.label} value={option.value} />
                ))}
              </el-select>
            </el-form-item>
          )}

          {form.value.type !== MenuType.FOLDER && (
            <el-form-item label="菜单值" required prop="value">
              <el-input
                modelValue={form.value.value}
                onUpdate:modelValue={(val) => (form.value.value = val)}
                placeholder={
                  form.value.subType === SubMenuType.GENERAL_FORM
                    ? "请输入表单ID"
                    : form.value.subType === SubMenuType.INTERNAL
                      ? "请输入路由名称"
                      : form.value.subType === SubMenuType.EXTERNAL_MENU
                        ? "请输入外部链接"
                        : "请输入菜单值"
                }
              />
            </el-form-item>
          )}

          <el-form-item label="菜单图标" prop="icon">
            <el-input modelValue={form.value.icon} onUpdate:modelValue={(val) => (form.value.icon = val)} placeholder="请输入图标名称或类名" />
          </el-form-item>

          <el-form-item label="父菜单ID" prop="parentId">
            <el-tree-select
              modelValue={form.value.parentId}
              onUpdate:modelValue={foo}
              data={menuTree.value}
              node-key={"id"}
              props={{ label: "name", children: "children" }}
              highlight-current
              accordion
            ></el-tree-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" onClick={onConfirm}>
              确认
            </el-button>
            <el-button onClick={() => ctx.emit("close")}>取消</el-button>
          </el-form-item>
        </el-form>
      );
    };
  },
});
</script>

<style lang="scss" scoped>
.menu-cards {
  display: flex;
  gap: 30px;
  justify-content: center;
  transform: translateY(-60%);
}

.menu-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  width: 180px;
  height: 180px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
}

.directory {
  background-color: #e8f5e9;
}

.menu {
  background-color: #f3e5f5;
}

.icon-container {
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}
</style>
