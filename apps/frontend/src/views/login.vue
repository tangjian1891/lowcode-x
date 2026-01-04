<template>
  <div class="login-container">
    <el-card class="login-box" shadow="always">
      <template #header>
        <div class="login-header">
          <h2>用户登录</h2>
        </div>
      </template>
      <el-form :model="loginForm" class="login-form" label-width="60px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" prefix-icon="User" size="large" />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            size="large"
            show-password
            @keyup.enter="handleLogin"
          />
        </el-form-item>

        <el-button type="primary" @click="handleLogin" :loading="loading" size="large" style="width: 100%">
          {{ loading ? "登录中..." : "登录" }}
        </el-button>
      </el-form>

      <el-alert v-if="errorMessage" :title="errorMessage" type="error" show-icon :closable="false" style="margin-top: 15px" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { instance } from "@/api/request";
import { useUser } from "@/stores/user";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const loginForm = ref({
  username: "admin",
  password: "123456",
});

const loading = ref(false);
const errorMessage = ref("");

const handleLogin = async () => {
  loading.value = true;
  try {
    const res = await instance({
      method: "POST",
      data: loginForm.value,
      url: "user/login",
    });
    localStorage.setItem("token", res.access_token);
    useUser().user = res.user;

    // 跳转到首页或其他页面
    router.push("/workbench");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-box {
  width: 100%;
  max-width: 400px;
}

.login-header {
  text-align: center;
}

.login-header h2 {
  color: #333;
  font-size: 24px;
  margin: 0;
  font-weight: 500;
}

.login-form {
  margin-top: 20px;
}
</style>
