import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/jas-layout/1231313/jas-table/1231312312',
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
          path: 'form/:formId/:mode',
          name: 'jas-form',
          component: () => import('@/views/jas-layout.vue'),
        },
        {
          path: 'jas-table/:formId',
          name: 'jas-table',
          component: () => import('@/jas-table/index.vue'),
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
