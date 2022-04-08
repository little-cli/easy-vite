import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../App.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
