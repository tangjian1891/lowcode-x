<template>
  <div class="tab-nav-container">
    <el-tabs
      v-model="activeTabName"
      type="card"
      closable
      @tab-click="handleTabClick"
      @tab-remove="handleTabRemove"
      @tab-change="handleTabChange"
    >
      <el-tab-pane v-for="tab in visitedTags" :key="tab.path" :label="tab.title" :name="tab.path">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 标签页数据结构
interface TagView {
  path: string
  title: string
  name?: string
}

// 初始化标签页数据
const visitedTags = ref<TagView[]>([
  { path: '/home', title: '首页', name: 'Home' },
  { path: '/about', title: '关于', name: 'About' },
  { path: '/table', title: '表格示例', name: 'Table' },
  { path: '/user/list', title: '用户管理', name: 'UserList' },
  { path: '/system/config', title: '系统配置', name: 'SystemConfig' },
  { path: '/dashboard/analysis', title: '数据分析', name: 'Analysis' },
  { path: '/dashboard/monitor', title: '系统监控', name: 'Monitor' },
  { path: '/report/daily', title: '日报表', name: 'DailyReport' },
  { path: '/report/weekly', title: '周报表', name: 'WeeklyReport' },
  { path: '/report/monthly', title: '月报表', name: 'MonthlyReport' },
  { path: '/customer/list', title: '客户列表', name: 'CustomerList' },
  { path: '/customer/detail', title: '客户详情', name: 'CustomerDetail' },
  { path: '/product/category', title: '产品分类', name: 'ProductCategory' },
  { path: '/product/inventory', title: '库存管理', name: 'Inventory' },
  { path: '/sale/order', title: '销售订单', name: 'SaleOrder' },
  { path: '/sale/statistics', title: '销售统计', name: 'SaleStatistics' },
  { path: '/finance/income', title: '收入管理', name: 'Income' },
  { path: '/finance/expense', title: '支出管理', name: 'Expense' },
  { path: '/finance/report', title: '财务报表', name: 'FinanceReport' },
  { path: '/hr/employee', title: '员工管理', name: 'Employee' },
  { path: '/hr/attendance', title: '考勤记录', name: 'Attendance' },
  { path: '/hr/salary', title: '薪资管理', name: 'Salary' },
  { path: '/settings/role', title: '角色管理', name: 'Role' },
  { path: '/settings/permission', title: '权限设置', name: 'Permission' },
])

// 当前活动标签名称
const activeTabName = ref(route.path)

// 需要缓存的组件名列表
const cachedViews = ref<string[]>(['HomeView', 'AboutView', 'TableView'])

// 根据当前路由添加标签页
const addVisitedTag = (route: any) => {
  const { path, meta, name } = route
  // 如果路由没有标题则不添加到标签页
  if (!meta?.title) return

  // 检查是否已存在
  const isExist = visitedTags.value.some((tag) => tag.path === path)
  if (!isExist) {
    visitedTags.value.push({
      path,
      title: meta.title,
      name,
    })
  }

  // 添加到缓存视图
  if (meta?.keepAlive && name && !cachedViews.value.includes(name)) {
    cachedViews.value.push(name)
  }
}

// 标签点击事件
const handleTabClick = (tab: any) => {
  router.push(tab.props.name)
}

// 标签移除事件
const handleTabRemove = (targetPath: string) => {
  // 找到要关闭的标签索引
  const index = visitedTags.value.findIndex((tag) => tag.path === targetPath)
  if (index === -1) return

  const tag = visitedTags.value[index]

  // 移除标签
  visitedTags.value.splice(index, 1)

  // 如果关闭的是当前激活的标签，则需要导航到其他标签
  if (targetPath === route.path) {
    // 优先跳转到右侧标签，如果没有右侧标签则跳转到左侧标签
    const nextTag = visitedTags.value[index] || visitedTags.value[index - 1]
    if (nextTag) {
      router.push(nextTag.path)
    }
  }

  // 如果需要，也可以从cachedViews中移除
  if (tag.name) {
    const i = cachedViews.value.indexOf(tag.name)
    if (i > -1) {
      cachedViews.value.splice(i, 1)
    }
  }
}

// 标签切换事件
const handleTabChange = (tabName: string) => {
  activeTabName.value = tabName
}

// 监听路由变化，添加标签页
watch(
  () => route.path,
  () => {
    addVisitedTag(route)
    activeTabName.value = route.path
  },
  { immediate: true },
)

// 组件挂载时初始化第一个标签
onMounted(() => {
  addVisitedTag(route)
  activeTabName.value = route.path
})

// 导出给父组件使用
defineExpose({
  visitedTags,
  cachedViews,
})
</script>

<style lang="scss" scoped>
.tab-nav-container {
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;

  :deep(.el-tabs__header) {
    margin-bottom: 0;
  }

  :deep(.el-tabs__nav) {
    border: none;
  }

  :deep(.el-tabs__item) {
    height: 36px;
    line-height: 36px;
    border-radius: 4px;
    margin-right: 4px;
    transition: all 0.2s;

    &.is-active {
      background-color: #409eff;
      color: #fff;
      border-color: #409eff;
    }

    &:not(.is-active):hover {
      background-color: #e6f7ff;
    }
  }
}
</style>
