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
import { MenuType, SubMenuType } from "../index";
import { instance } from "@/api/request";

const qwer = defineComponent({
  name: "add-menu-dialog",
  data() {
    return {
      menuTree: [] as any[],
      form: {
        name: "",
        type: MenuType.FOLDER,
        subType: SubMenuType.GENERAL_FORM,
        value: "",
        icon: "",
        parentId: "",
        order: 0,
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
  async mounted() {
    const res = await instance.request({
      url: "/menu",
      method: "GET",
    });
    this.menuTree = res.data;
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
          const res = await instance.request({
            url: "/menu",
            method: "POST",
            data: this.form,
          });
          console.log("保存成功");
          this.$emit("close");
        }
      });
    },
    handleParentSelect(val: string) {
      console.log("这是啥啊", val);
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
  emits: ["close"],
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
            data={this.menuTree}
            node-key="id"
            props={{ label: "name", children: "children" }}
            highlight-current
            accordion
            clearable
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
