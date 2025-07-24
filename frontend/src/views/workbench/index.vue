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
        <div class="workbench-item" v-for="item in filteredList" :key="item.id" @click="handleSystemClick(item)">
          <div class="workbench-item-icon">
            <el-avatar :size="40" style="background: #409eff" icon="el-icon-setting" />
            <el-button class="workbench-item-setting" icon="el-icon-setting" circle size="small" @click.stop="handleSettingClick(item)" />
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
        <div v-if="!loading && filteredList.length === 0" class="workbench-empty">
          <el-empty description="暂无子系统数据" />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useUser } from "@/stores/user";
import { ref, computed, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { api } from "@/api";

interface SystemItem {
  id: string;
  name: string;
  status?: string;
  createdAt?: string;
}

const user = useUser();
const loading = ref(false);
const router = useRouter();

const fetchSystems = async () => {
  try {
    loading.value = true;
    const currentUser = user.user as any;
    if (!currentUser?.id) {
      ElMessage.error("用户信息获取失败");
      return;
    }
    const res = await api.system.listByUserId(currentUser.id);
    console.log("没有", res);

    list.value = res || [];
  } catch (error) {
    console.error("获取系统列表失败:", error);
    ElMessage.error("获取系统列表失败");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchSystems();
});

const search = ref("");
const list = ref<SystemItem[]>([]);

const filteredList = computed(() => list.value.filter((item) => !search.value || item.name.includes(search.value)));

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString();
};

const handleCreateSystem = () => {
  ElMessage.info("创建子系统功能开发中...");
};

const handleSystemClick = (system: SystemItem) => {
  ElMessage.info(`进入系统：${system.name}`);
  // 这里可以添加路由跳转逻辑
  router.push(`/jas-layout/${system.id}`);
};

const handleSettingClick = (system: SystemItem) => {
  ElMessage.info(`设置系统：${system.name}`);
  // 这里可以添加设置相关逻辑
};
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
  .workbench-item-setting {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #f5f7fa;
    color: #409eff;
    border: none;
    opacity: 0;
    transition: opacity 0.2s ease;
  }
}

.workbench-item:hover .workbench-item-setting {
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
