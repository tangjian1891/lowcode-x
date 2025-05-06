import { createRouter, createWebHistory } from 'vue-router'
import TjDynamice from '@/views/tj-dynamice.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/jas-layout/1231313/1231312312',
    },

    {
      path: '/child',
      name: 'child',
      component: () => import('@/Child.vue'),
    },
    {
      path: '/jas-layout/:systemId',
      name: 'jas-layout',
      component: () => import('@/views/layout/jas-layout.vue'),
      children: [
        {
          path: ':menuId',
          name: 'menu',
          component: {
            name: 'dynamic-menu',
            render() {
              return h('div', '')
            },
          },
        },
      ],
    },
    {
      path: '/form/:formId/:mode',
      name: 'form',
      component: () => import('@/views/form/jas-form-page.vue'),
    },
    {
      path: '/jas-table-page/:formId',
      name: 'jas-table-page',
      component: () => import('@/views/table/jas-table-page.vue'),
    },
  ],
})

export default router
window.router = router

router.beforeEach((to, from) => {
  console.log(to.name, to.path)
  if (to.name === 'menu') {
    const menuId = to.params.menuId as string
    router.addRoute('jas-layout', {
      path: ':menuId',
      name: menuId,
      component: {
        name: menuId,
        render() {
          return h(TjDynamice)
        },
      },
    })
    router.replace({ name: menuId, params: to.params })
    return false
  }
  return true
})
