<template>
  <div class="layout-container">
    <!-- 菜单部分，根据layout参数决定是否显示 -->
    <aside v-if="showMenu" class="menu-container">
      <h3>系统菜单</h3>
      <ul class="menu-list">
        <li><router-link to="/page/with-menu/list">列表页面</router-link></li>
        <li><router-link to="/page/with-menu/form/add">新增表单</router-link></li>
        <li><router-link to="/page/with-menu/form/edit">编辑表单</router-link></li>
        <li><router-link to="/page/with-menu/form/detail">详情表单</router-link></li>
      </ul>
    </aside>

    <!-- 内容区域 -->
    <div class="content-container" :class="{ 'full-width': !showMenu }">
      <!-- 列表内容 -->
      <div v-if="isListContent" class="list-container">
        <h2>{{ getPageTitle() }}</h2>
        <div class="table-toolbar">
          <button @click="handleAddNew">新增</button>
          <button>导出</button>
          <button>批量操作</button>
        </div>
        <!-- 这里可以使用你的jas-table组件 -->
        <div class="table-placeholder">
          <p>表格内容区域</p>
        </div>
        <div class="pagination">
          <p>分页组件</p>
        </div>
      </div>

      <!-- 表单内容 -->
      <div v-else-if="isFormContent" class="form-container">
        <h2>{{ getPageTitle() }}</h2>
        <div class="form-content">
          <p>表单内容区域 - {{ formType }}</p>
          <!-- 这里可以使用你的jas-form组件 -->
        </div>
        <div class="form-actions">
          <button v-if="formType !== 'detail'" @click="handleSave">保存</button>
          <button @click="handleClose">关闭</button>
        </div>
      </div>

      <!-- 默认内容 -->
      <div v-else>
        <h2>欢迎使用系统</h2>
        <p>请从菜单中选择功能</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 从URL参数获取布局类型，默认为无菜单
const layout = computed(() => (route.params.layout as string) || 'no-menu')
// 显示菜单的条件
const showMenu = computed(() => layout.value === 'with-menu')

// 从URL参数获取内容类型，默认为空
const contentType = computed(() => (route.params.contentType as string) || '')
// 内容类型判断
const isListContent = computed(() => contentType.value === 'list')
const isFormContent = computed(() => contentType.value === 'form' || route.path.includes('/form/'))

// 获取表单类型 (add/edit/detail)
const formType = computed(() => {
  return (route.params.formType as string) || 'add'
})

// 动态获取页面标题
const getPageTitle = () => {
  if (isListContent.value) {
    return '数据列表'
  } else if (isFormContent.value) {
    switch (formType.value) {
      case 'add':
        return '新增数据'
      case 'edit':
        return '编辑数据'
      case 'detail':
        return '数据详情'
      default:
        return '表单页面'
    }
  }
  return '系统页面'
}

// 处理新增按钮点击
const handleAddNew = () => {
  router.push(`/page/${layout.value}/form/add`)
}

// 处理保存按钮点击
const handleSave = () => {
  // 这里可以添加表单保存逻辑
  console.log('保存表单数据')
  router.push(`/page/${layout.value}/list`)
}

// 处理关闭按钮点击
const handleClose = () => {
  router.push(`/page/${layout.value}/list`)
}
</script>

<style scoped>
.layout-container {
  display: flex;
  min-height: 100vh;
}

.menu-container {
  width: 200px;
  background-color: #f0f2f5;
  padding: 20px;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
}

.menu-list {
  list-style: none;
  padding: 0;
}

.menu-list li {
  margin-bottom: 10px;
}

.menu-list a {
  display: block;
  padding: 8px 10px;
  text-decoration: none;
  color: #333;
  border-radius: 4px;
}

.menu-list a:hover,
.menu-list a.router-link-active {
  background-color: #e6f7ff;
  color: #1890ff;
}

.content-container {
  flex: 1;
  padding: 20px;
}

.full-width {
  width: 100%;
}

.table-toolbar,
.form-actions {
  margin: 20px 0;
}

.table-toolbar button,
.form-actions button {
  margin-right: 10px;
  padding: 6px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
}

.table-toolbar button:hover,
.form-actions button:hover {
  color: #1890ff;
  border-color: #1890ff;
}

.table-placeholder,
.form-content {
  min-height: 300px;
  background-color: #fafafa;
  border: 1px solid #e8e8e8;
  padding: 20px;
  border-radius: 4px;
}

.pagination {
  margin-top: 20px;
  text-align: right;
}
</style>
