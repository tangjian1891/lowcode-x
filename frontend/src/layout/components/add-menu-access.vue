<template>
  <div class="w-full h-full flex items-center justify-center flex-col">
    <div class="parent-menu" style="width: 100%; display: flex; justify-content: center; margin-bottom: 40px">
      <el-tree-select
        v-model="selectedParentId"
        :data="menuTree"
        node-key="id"
        :props="{ label: 'name', children: 'children', disabled: (node) => node.type !== MenuType.FOLDER }"
        placeholder="请选择父菜单"
        style="width: 300px"
        clearable
        check-strictly
      />
    </div>
    <div class="menu-cards">
      <div class="menu-card directory" @click="addMenu(MenuType.FOLDER)">
        <div class="icon-container">
          <el-icon color="#4CAF50" :size="32">
            <Folder />
          </el-icon>
        </div>
        <div class="card-title">新增目录</div>
      </div>

      <div class="menu-card menu" @click="addMenu(MenuType.MENU)">
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
const props = defineProps({
  menuTree: Array,
  systemInfo: Object,
});
const emit = defineEmits(["add-directory", "add-menu", "refreshMenu"]);
const selectedParentId = ref("");
function addMenu(type: MenuType) {
  const dialog = createDialog(addMenuComponent, {
    menuTree: props.menuTree,
    parentId: selectedParentId.value,
    systemInfo: props.systemInfo,
    type: type,
    onConfirm() {
      dialog.close();
      emit("refreshMenu");
    },
  });
}
</script>

<script lang="tsx">
import { MenuType, SubMenuType } from "../index";

const addMenuComponent = defineComponent({
  name: "add-menu-dialog",
  props: ["componentOptions", "menuTree"],
  data() {
    return {
      form: {
        name: "",
        type: this.componentOptions.type || MenuType.FOLDER,
        subType: SubMenuType.GENERAL_FORM,
        value: "",
        icon: "",
        parentId: this.componentOptions.parentId || "",
        order: 0,
        systemId: this.componentOptions.systemInfo.id,
      },
      formResetter: utils.createSmartResetter(this.form),
      menuTypeOptions: [
        { label: "目录", value: MenuType.FOLDER },
        { label: "菜单", value: MenuType.MENU },
      ],
      subMenuTypeOptions: [
        { label: "通用表单", value: SubMenuType.GENERAL_FORM },
        { label: "自定义页面", value: SubMenuType.INTERNAL },
        { label: "外部页面", value: SubMenuType.EXTERNAL_MENU },
      ],
    };
  },

  computed: {
    showValue() {
      return this.form.type === MenuType.MENU && [SubMenuType.EXTERNAL_MENU, SubMenuType.INTERNAL].includes(this.form.subType);
    },
  },
  methods: {
    async onConfirm() {
      const formRef = this.$refs.formRef as FormInstance;
      console.log(formRef);
      formRef.validate(async (flag) => {
        if (flag) {
          await api.menu.create(this.form);
          ElMessage.success("保存成功");
          this.componentOptions.onConfirm();
        }
      });
    },
    handleParentSelect(val: string) {
      this.form.parentId = val;
    },
    getPlaceholder() {
      if (this.form.subType === SubMenuType.GENERAL_FORM) {
        return "请输入表单ID";
      } else if (this.form.subType === SubMenuType.INTERNAL) {
        return "请输入路由名称";
      } else if (this.form.subType === SubMenuType.EXTERNAL_MENU) {
        return "请输入外部链接";
      }
      return "请输入菜单值";
    },
  },
  emits: ["close", "confirm"],
  render() {
    return (
      <el-form model={this.form} label-width="100px" style="max-width: 600px;" ref="formRef">
        <el-form-item label="菜单名称" required prop="name">
          <el-input modelValue={this.form.name} onUpdate:modelValue={(val: string) => (this.form.name = val)} placeholder="请输入菜单名称" />
        </el-form-item>

        <el-form-item label="菜单类型" required prop="type">
          <el-select
            modelValue={this.form.type}
            onUpdate:modelValue={(val: MenuType) => (this.form.type = val)}
            placeholder="请选择菜单类型"
            onChange={() => this.formResetter(this.form, ["subType", "value"])}
          >
            {this.menuTypeOptions.map((option) => (
              <el-option key={option.value} label={option.label} value={option.value} />
            ))}
          </el-select>
        </el-form-item>

        {this.form.type === MenuType.MENU && (
          <el-form-item label="菜单子类型" prop="subType">
            <el-select
              modelValue={this.form.subType}
              onUpdate:modelValue={(val: SubMenuType) => (this.form.subType = val)}
              placeholder="请选择菜单子类型"
              onChange={() => this.formResetter(this.form, ["value"])}
            >
              {this.subMenuTypeOptions.map((option) => (
                <el-option key={option.value} label={option.label} value={option.value} />
              ))}
            </el-select>
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
            data={this.componentOptions.menuTree}
            node-key="id"
            props={{ label: "name", children: "children", disabled: (node) => node.type !== MenuType.FOLDER }}
            clearable
            check-strictly
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" onClick={this.onConfirm}>
            确认
          </el-button>
          <el-button onClick={() => this.$emit("close")}>取消</el-button>
        </el-form-item>
      </el-form>
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
