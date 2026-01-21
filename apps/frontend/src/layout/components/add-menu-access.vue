<template>
  <div class="w-full h-full flex items-center justify-center flex-col">
    <div class="parent-menu" style="width: 100%; display: flex; justify-content: center; margin-bottom: 40px">
      <el-tree-select
        v-model="selectedParentId"
        :data="menuTree"
        node-key="id"
        :props="{ label: 'name', children: 'children', disabled: (node: any) => node.type !== MenuModel.Type.FOLDER }"
        placeholder="请选择父菜单"
        style="width: 300px"
        clearable
        check-strictly
      />
    </div>
    <div class="menu-cards">
      <div class="menu-card directory" @click="addMenu(MenuModel.Type.FOLDER)">
        <div class="icon-container">
          <el-icon color="#4CAF50" :size="32">
            <Folder />
          </el-icon>
        </div>
        <div class="card-title">新增目录</div>
      </div>

      <div class="menu-card menu" @click="addMenu(MenuModel.Type.PAGE)">
        <div class="icon-container">
          <el-icon color="#9575CD" :size="32">
            <MenuIcon />
          </el-icon>
        </div>
        <div class="card-title">新增菜单</div>
      </div>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { ElMessage, type FormContext, type FormInstance, ElForm } from "element-plus";
import { Folder, Menu as MenuIcon } from "@element-plus/icons-vue";
import { createDialog } from "@/tj-dialog";
import { Menu as MenuModel } from "@backend/menu/menu.model";

const props = defineProps({
  menuTree: Array,
  systemInfo: Object,
});
const emit = defineEmits(["add-directory", "add-menu", "refreshMenu"]);
const selectedParentId = ref("");
function addMenu(type: (typeof MenuModel.Type)[keyof typeof MenuModel.Type]) {
  const appDialog = AppDialog.create(addMenuComponent);
  Object.assign(appDialog.componentProps, {
    menuTree: props.menuTree,
    parentId: selectedParentId.value,
    systemInfo: props.systemInfo,
    type: type,
  });

  appDialog.dialogProps.onConfirm = () => {
    emit("refreshMenu");
    appDialog.destory();
  };
}
</script>

<script lang="tsx">
import { AppDialog } from "@/AppUI/AppDialog/AppDialog";
import { Teleport } from "vue";

const addMenuComponent = defineComponent({
  name: "add-menu-dialog",
  props: ["appDialog", "menuTree"],
  data() {
    return {
      form: new MenuModel(),
      formResetter: utils.createSmartResetter(this.form),
      menuTypeOptions: [
        { label: "目录", value: MenuModel.Type.FOLDER },
        { label: "页面", value: MenuModel.Type.PAGE },
      ],
      subMenuTypeOptions: [
        { label: "通用表单", value: MenuModel.PageType.FORM },
        { label: "自定义页面", value: MenuModel.PageType.VIEW },
        { label: "外部页面", value: MenuModel.PageType.LINK },
      ],
    };
  },
  created() {
    this.appDialog.dialogProps.title = "新增目录";
    this.form.systemId = this.appDialog.componentProps.systemInfo.id;
    this.form.type = this.appDialog.componentProps.type;
  },

  computed: {
    showValue() {
      return this.form.type === MenuModel.Type.PAGE && [MenuModel.PageType.LINK, MenuModel.PageType.VIEW].includes(this.form.pageType);
    },
  },
  methods: {
    async onConfirm() {
      const formRef = this.$refs.formRef as FormInstance;
      console.log(formRef);
      formRef.validate(async (flag) => {
        if (flag) {
          await api.menu.save(this.form);
          ElMessage.success("保存成功");
          this.appDialog.dialogProps.onConfirm();
        }
      });
    },
    handleParentSelect(val: string) {
      this.form.parentId = val;
    },
    getPlaceholder() {
      if (this.form.pageType === MenuModel.PageType.VIEW) {
        return "请输入路由名称";
      } else if (this.form.pageType === MenuModel.PageType.LINK) {
        return "请输入外部链接";
      }
      return "请输入菜单值";
    },
  },
  emits: ["close", "confirm"],
  render() {
    return (
      <ElForm model={this.form} label-width="100px" style="max-width: 600px;" ref="formRef">
        <el-form-item label="菜单名称" required prop="name">
          <el-input modelValue={this.form.name} onUpdate:modelValue={(val: string) => (this.form.name = val)} placeholder="请输入菜单名称" />
        </el-form-item>

        <el-form-item label="菜单类型" required prop="type">
          <el-select
            modelValue={this.form.type}
            onUpdate:modelValue={(val: (typeof MenuModel.Type)[keyof typeof MenuModel.Type]) => (this.form.type = val)}
            placeholder="请选择菜单类型"
            onChange={() => this.formResetter(this.form, ["pageType", "value"])}
            v-slots={{
              default: () => this.menuTypeOptions.map((option) => <el-option key={option.value} label={option.label} value={option.value} />),
            }}
          ></el-select>
        </el-form-item>

        {this.form.type === MenuModel.Type.PAGE && (
          <el-form-item label="菜单子类型" prop="pageType">
            <el-select
              modelValue={this.form.pageType}
              onUpdate:modelValue={(val: (typeof MenuModel.PageType)[keyof typeof MenuModel.PageType]) => (this.form.pageType = val)}
              placeholder="请选择菜单子类型"
              onChange={() => this.formResetter(this.form, ["value"])}
              v-slots={{
                default: () => this.subMenuTypeOptions.map((option) => <el-option key={option.value} label={option.label} value={option.value} />),
              }}
            ></el-select>
          </el-form-item>
        )}

        {this.showValue && (
          <el-form-item label="菜单值" required prop="value">
            <el-input
              modelValue={this.form.value}
              onUpdate:modelValue={(val: string) => (this.form.value = val)}
              placeholder={this.getPlaceholder()}
            />
          </el-form-item>
        )}

        <el-form-item label="菜单图标" prop="icon">
          <el-input modelValue={this.form.icon} onUpdate:modelValue={(val: string) => (this.form.icon = val)} placeholder="请输入图标名称或类名" />
        </el-form-item>

        <el-form-item label="父菜单ID" prop="parentId">
          <el-tree-select
            modelValue={this.form.parentId}
            onUpdate:modelValue={this.handleParentSelect}
            data={this.appDialog.componentProps.menuTree}
            node-key="id"
            props={{ label: "name", children: "children", disabled: (node: any) => node.type !== MenuModel.Type.FOLDER }}
            clearable
            check-strictly
          />
        </el-form-item>
        <Teleport defer to={"#" + this.appDialog.teleportId}>
          <el-button type="primary" onClick={this.onConfirm}>
            确认
          </el-button>
          <el-button onClick={() => this.$emit("close")}>取消</el-button>
        </Teleport>
      </ElForm>
    );
  },
});
</script>

<style lang="scss" scoped>
.parent-menu {
  transform: translateY(-140px);
}
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
