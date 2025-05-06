<template>
  <component :is="targetComp" :menu="menu"> </component>
</template>

<script lang="ts" setup>
import { ref, shallowRef, defineAsyncComponent, onMounted } from 'vue'
import { Menu, SubMenuType } from '@/views/layout'
import { systemManagementMenus } from '@/views/layout/menu-data'
import { useRoute } from 'vue-router'

const targetComp = shallowRef()
const menu = ref()
const route = useRoute()

// 根据menuId查找菜单项
const findMenuById = (menuId: string, menus: Menu[]): Menu | null => {
  for (const menuItem of menus) {
    if (menuItem.id === menuId) {
      return menuItem
    }
    if (menuItem.children && menuItem.children.length > 0) {
      const found = findMenuById(menuId, menuItem.children)
      if (found) return found
    }
  }
  return null
}

// 根据菜单类型加载对应的组件
const loadComponentByMenu = (menuItem: Menu) => {
  menu.value = menuItem

  if (!menuItem) {
    console.error('未找到对应的菜单项')
    return
  }

  switch (menuItem.subType) {
    case SubMenuType.EXTERNAL_MENU:
      // 加载外部链接组件
      targetComp.value = defineAsyncComponent(() => {
        return import('@/core-components/tj-iframe/tj-iframe.vue')
      })
      break
    case SubMenuType.INTERNAL:
      // 加载内部路由对应的组件
      const componentPath = getComponentPathByValue(menuItem.value)
      targetComp.value = defineAsyncComponent(() => {
        return import(componentPath)
      })
      break
    case SubMenuType.GENERAL_FORM:
      // 加载通用表单组件
      targetComp.value = defineAsyncComponent(() => {
        return import('@/views/form/jas-form-page.vue')
      })
      break
    default:
      console.error('未知的菜单子类型:', menuItem.subType)
  }
}

// 根据菜单value获取组件路径的映射
const getComponentPathByValue = (value: string): string => {
  const componentMap: Record<string, string> = {
    'role-management': '@/views/manage-plan/manage-plan.vue',
    'form-designer': '@/views/form/jas-form-page.vue',
    'code-generator': '@/views/table/jas-table-page.vue',
    // 可以根据实际情况添加更多映射
  }

  return componentMap[value] || '@/views/manage-plan/manage-plan.vue' // 默认返回
}

onMounted(() => {
  // 从路由参数中获取menuId
  const menuId = route.params.menuId as string
  console.log('有菜单啊', menuId)

  if (menuId) {
    // 根据menuId查找菜单项
    const menuItem = findMenuById(menuId, systemManagementMenus)
    if (menuItem) {
      loadComponentByMenu(menuItem)
    } else {
      console.error('未找到ID为', menuId, '的菜单项')
    }
  } else {
    // 保留原有逻辑作为默认情况
    menu.value = new Menu({
      name: '内部的',
      subType: SubMenuType.INTERNAL,
      value: 'https://www.baidu.com',
    })
    targetComp.value = defineAsyncComponent(() => {
      return import('@/views/manage-plan/manage-plan.vue')
    })
  }
})
</script>

<style lang="scss" scoped></style>
