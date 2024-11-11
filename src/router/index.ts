import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/dashboard/Index.vue'),
        name: 'dashboard',
        meta: {
          title: '⾸⻚',
          icon: '#icondashboard'
        }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    name: 'system',
    meta: {
      title: '系统管理',
      icon: 'Setting',
      roles: ['sys:manage']
    },
    children: [
      {
        path: '/userList',
        component: () => import('@/views/system/User/UserList.vue'),
        name: 'userList',
        meta: {
          title: '⽤户管理',
          icon: 'UserFilled',
          roles: ['sys:user']
        }
      },
      {
        path: '/roleList',
        component: () => import('@/views/system/Role/RoleList.vue'),
        name: 'roleList',
        meta: {
          title: '⻆⾊管理',
          icon: 'Wallet',
          roles: ['sys:role']
        }
      },
      {
        path: '/menuList',
        component: () => import('@/views/system/Menu/MenuList.vue'),
        name: 'menuList',
        meta: {
          title: '菜单管理',
          icon: 'Menu',
          roles: ['sys:menu']
        }
      }
    ]
  },
  {
    path: '/goodsRoot',
    component: Layout,
    name: 'goodsRoot',
    meta: {
      title: '商品管理',
      icon: 'Setting',
      roles: ['sys:goodsRoot']
    },
    children: [
      {
        path: '/category',
        component: () => import('@/views/category/CategoryList.vue'),
        name: 'category',
        meta: {
          title: '商品类型',
          icon: 'UserFilled',
          roles: ['sys:category']
        }
      },
      {
        path: '/goodsList',
        component: () => import('@/views/goods/GoodsList.vue'),
        name: 'goodsList',
        meta: {
          title: '商品信息',
          icon: 'Wallet',
          roles: ['sys:goodsList']
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
