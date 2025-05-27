<template>
  <div class="h-full w-full flex bg-#001529 text-white">
    <!-- 左侧公司名 -->
    <div class="company-logo flex shrink-0 basis-200px items-center justify-center">
      <h1 class="text-lg font-bold">{{ companyName }}</h1>
    </div>

    <!-- 中间菜单 -->
    <div class="flex flex-1 justify-center overflow-hidden px-20px">
      <jas-top-menu @select="handleMenuSelect" />
    </div>

    <!-- 右侧用户信息 -->
    <div class="user-info h-full flex shrink-0 basis-300px items-center justify-center">
      <div class="flex items-center gap-3">
        <el-avatar :size="32" :src="userAvatar">
          {{ userInitials }}
        </el-avatar>
        <span class="username">{{ userName }}</span>
        <el-divider direction="vertical" />
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link flex cursor-pointer items-center">
            <i class="el-icon-setting mr-1"></i>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile">个人信息</el-dropdown-item>
              <el-dropdown-item command="settings">系统设置</el-dropdown-item>
              <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import JasTopMenu from "./jas-top-menu.vue";

// 公司名称
const companyName = ref("某某科技有限公司");

// 用户信息
const userName = ref("管理员");
const userAvatar = ref("");
const userInitials = ref("管");

// 处理菜单选择事件 - 转发自jas-top-menu组件
const emit = defineEmits(["select"]);
const handleMenuSelect = (index: string) => {
  emit("select", index);
};

// 处理用户下拉菜单命令
const handleCommand = (command: string) => {
  if (command === "logout") {
    // 退出登录逻辑
    console.log("用户退出登录");
    // 这里可以添加退出登录的实际逻辑，如清除token、跳转到登录页等
  } else if (command === "profile") {
    console.log("查看个人信息");
  } else if (command === "settings") {
    console.log("打开系统设置");
  }
};
</script>

<style lang="scss" scoped>
.jas-top-layout {
  height: 50px;

  .company-logo {
    min-width: 200px;
  }

  .user-info {
    min-width: 150px;
  }
}
</style>
