import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/layout/:systemId',
      name: 'layout',
      component: () => import('@/views/layout/jas-layout.vue'),
      children: [
        {
          path: 'form/:formId/:mode',
          name: 'layout-form',
          component: () => import('@/views/jas-layout.vue'),
        },
        {
          path: 'table/:formId',
          name: 'layout-table',
          component: () => import('@/views/jas-layout.vue'),
        },
      ],
    },
    {
      path: '/form/:formId/:mode',
      name: 'form',
      component: () => import('@/views/form/form.vue'),
    },
    {
      path: '/table/:formId',
      name: 'table',
      component: () => import('@/views/table/table.vue'),
    },
  ],
})

export default router
