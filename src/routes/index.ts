import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../App.vue')
  },
  {
    path: '/mouse',
    component: () => import('../Mouse.vue')
  },
  {
    path: '/props',
    component: () => import('../communication/props/index.vue')
  },
  {
    path: '/emit',
    component: () => import('../communication/emit/index.vue')
  },
  {
    path: '/model',
    component: () => import('../communication/model/index.vue')
  },
  {
    path: '/refs',
    component: () => import('../communication/refs/index.vue')
  },
  {
    path: '/provide',
    component: () => import('../communication/provide/index.vue')
  },
  {
    path: '/list',
    component: () => import('../communication/virtual/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
