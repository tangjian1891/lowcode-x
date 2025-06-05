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

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { Folder, Menu } from "@element-plus/icons-vue";

const emit = defineEmits(["add-directory", "add-menu"]);

const handleAddDirectory = () => {
  emit("add-directory");
  ElMessage.success("即将创建新目录");
};

const handleAddMenu = () => {
  emit("add-menu");
  ElMessage.success("即将创建新菜单");
};
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
