<template>
  <div class="workbench-container">
    <div class="workbench-header">
      <div class="workbench-title">子系统配置</div>
      <el-button class="workbench-help-btn" type="primary" plain size="small">帮助中心</el-button>
    </div>
    <el-card class="workbench-card">
      <div class="workbench-sub-header">
        <div class="workbench-sub-title">我的子系统</div>
        <el-input class="workbench-search" placeholder="搜索子系统" size="small" prefix-icon="el-icon-search" v-model="search" clearable />
        <el-button class="workbench-create-btn" type="success" size="small" @click="handleCreateSystem">创建子系统</el-button>
      </div>
      <div class="workbench-list" v-loading="loading">
        <div class="workbench-item" v-for="item in state.filteredList" :key="item.id" @click="handleSystemClick(item)">
          <div class="workbench-item-icon">
            <el-avatar :size="40" style="background: #409eff" icon="el-icon-setting" />
            <div class="workbench-item-actions">
              <el-button class="workbench-item-action" icon="Edit" circle size="small" @click.stop="handleEditClick(item)" title="编辑" />
              <el-button
                class="workbench-item-action"
                icon="Delete"
                circle
                size="small"
                type="danger"
                @click.stop="handleDeleteClick(item)"
                title="删除"
              />
            </div>
          </div>
          <div class="workbench-item-content">
            <div class="workbench-item-title">{{ item.name }}</div>
            <div class="workbench-item-meta">
              <span>状态：{{ item.status || "运行中" }}</span>
              <span>创建时间：{{ formatDate(item.createdAt) }}</span>
            </div>
          </div>
        </div>
        <!-- 空状态 -->
        <div v-if="!loading && state.filteredList.length === 0" class="workbench-empty">
          <el-empty description="暂无子系统数据" />
        </div>
      </div>
    </el-card>
  </div>

  <Qwer></Qwer>
</template>

<script setup lang="tsx">
import { useUser } from "@/stores/user";
import { ref, computed, onMounted, Teleport } from "vue";
import { ElForm, ElMessage, ElMessageBox } from "element-plus";
import { api } from "@/api";
import { useRouter } from "vue-router";
import { AppDialog } from "@/AppUI/AppDialog/AppDialog";

interface SystemItem {
  id: string;
  name: string;
  status?: string;
  createdAt?: string;
}

const user = useUser();
const loading = ref(false);
const router = useRouter();

const Qwer = defineComponent({
  render() {
    return <div>Qwer</div>;
  },
});
const state = reactive({
  pageNum: 1,
  pageSize: 10,
  list: [],
  // computed
  filteredList: computed(() => state.list.filter((item) => !search.value || item.name.includes(search.value))),
});

const getList = async () => {
  try {
    loading.value = true;
    const currentUser = user.user as any;
    if (!currentUser?.id) {
      ElMessage.error("用户信息获取失败");
      return;
    }
    const res = await api.system.page({
      pageNum: state.pageNum,
      pageSize: state.pageSize,
    });
    console.log("没有", res);
    state.list = res.list;
  } catch (error) {
    console.error("获取系统列表失败:", error);
    ElMessage.error("获取系统列表失败");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getList();
});

const search = ref("");

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString();
};

const handleCreateSystem = () => {
  const dialog = AppDialog.create(addDialog);
};

const handleSystemClick = (system: SystemItem) => {
  ElMessage.info(`进入系统：${system.name}`);
  // 这里可以添加路由跳转逻辑
  router.push(`/app-layout/${system.id}`);
};

const handleSettingClick = (system: SystemItem) => {
  ElMessage.info(`设置系统：${system.name}`);
  // 这里可以添加设置相关逻辑
};

const handleEditClick = (system: SystemItem) => {
  const dialog = AppDialog.create(addDialog);
  dialog.componentProps.id = system.id;
  dialog.open();
};

const handleDeleteClick = (system: SystemItem) => {
  ElMessageBox.confirm(`确定要删除子系统"${system.name}"吗？此操作不可恢复。`, "删除确认", {
    confirmButtonText: "确定删除",
    cancelButtonText: "取消",
    type: "warning",
    confirmButtonClass: "el-button--danger",
  })
    .then(async () => {
      try {
        await api.system.remove({ id: system.id });
        ElMessage.success("删除成功");
        await getList();
      } catch (error) {
        console.error("删除失败:", error);
        ElMessage.error("删除失败");
      }
    })
    .catch(() => {
      // 用户取消删除
    });
};

const addDialog = defineComponent({
  name: "AddDialog",
  props: ["appDialog"],
  data() {
    return {
      form: {
        name: "",
        userId: (useUser().user as any)?.id || "",
      },
    };
  },
  async mounted() {
    if (this.appDialog.componentProps.id) {
      this.form = await api.system.detail(this.appDialog.componentProps.id);
    }
  },
  methods: {
    async onSubmit() {
      const res = await api.system.save(this.form);
      getList();
      this.appDialog.destory();
    },
    onClose() {},
  },
  render() {
    return (
      <ElForm>
        <el-form-item label="子系统名称">
          <el-input modelValue={this.form.name} onUpdate:modelValue={(v: string) => (this.form.name = v)} placeholder="请输入子系统名称" />
        </el-form-item>
        <Teleport defer to={"#" + this.appDialog.teleportId}>
          <el-form-item>
            <el-button onClick={this.onClose}>取消</el-button>
            <el-button type="primary" onclick={this.onSubmit}>
              提交
            </el-button>
          </el-form-item>
        </Teleport>
      </ElForm>
    );
  },
});
</script>

<style lang="scss" scoped>
.workbench-container {
  padding: 16px;
  background: #f5f7fa;
  min-height: 100vh;
}
.workbench-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.workbench-title {
  font-size: 20px;
  font-weight: bold;
}
.workbench-help-btn {
  float: right;
}
.workbench-card {
  padding: 16px 24px 24px 24px;
}
.workbench-sub-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.workbench-sub-title {
  font-size: 16px;
  font-weight: 500;
  margin-right: 16px;
}
.workbench-search {
  width: 200px;
  margin-right: auto;
}
.workbench-create-btn {
  margin-left: 16px;
}
.workbench-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  min-height: 200px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 12px;
  }
}

.workbench-empty {
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}
.workbench-item {
  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  padding: 16px 12px 12px 12px;
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 120px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-color: #409eff;
    transform: translateY(-2px);
  }
}
.workbench-item-icon {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  .el-avatar {
    background: #409eff;
    color: #fff;
    margin-right: 8px;
  }
  .workbench-item-actions {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    gap: 4px;
    opacity: 0;
    transition: opacity 0.2s ease;

    .workbench-item-action {
      background: #f5f7fa;
      border: 1px solid #dcdfe6;

      &:first-child {
        color: #409eff;
      }

      &.el-button--danger {
        color: #f56c6c;
        border-color: #f56c6c;

        &:hover {
          background: #f56c6c;
          color: #fff;
        }
      }

      &:hover:not(.el-button--danger) {
        background: #409eff;
        color: #fff;
        border-color: #409eff;
      }
    }
  }
}

.workbench-item:hover .workbench-item-actions {
  opacity: 1;
}
.workbench-item-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.workbench-item-title {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #333;
}
.workbench-item-meta {
  font-size: 13px;
  color: #909399;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
</style>
