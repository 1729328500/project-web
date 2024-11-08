<template>
  <menu-logo></menu-logo>
  <el-menu
    :default-active="defaultActive"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    class="el-menu-vertical-demo"
    background-color="#304156"
    unique-opened
    router
  >
    <menu-item :menuList="menuList"></menu-item>
  </el-menu>
</template>
<script setup lang="ts">
import { reactive, computed } from 'vue'
import MenuItem from '@/layout/menu/MenuItem.vue'
import MenuLogo from './MenuLogo.vue'

import { useRoute } from 'vue-router'
const route = useRoute()

const defaultActive = computed(() => {
  const { path } = route
  return path
})
import { useMenuStore } from '@/store/menu'
//获取store
const store = useMenuStore()
//获取状态
const isCollapse = computed(() => {
  return store.getCollapse
})
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
let menuList = reactive([
  {
    path: '/system',
    component: 'Layout',
    name: 'system',
    meta: {
      title: '系统管理',
      icon: 'Setting',
      roles: ['sys:manage']
    },
    children: [
      {
        path: '/userList',
        component: '/system/User/UserList',
        name: 'userList',
        meta: {
          title: '⽤户管理',
          icon: 'UserFilled',
          roles: ['sys:user']
        }
      },
      {
        path: '/roleList',
        component: '/system/Role/RoleList',
        name: 'roleList',
        meta: {
          title: '⻆⾊管理',
          icon: 'Wallet',
          roles: ['sys:role']
        }
      },
      {
        path: '/menuList',
        component: '/system/Menu/MenuList',
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
    component: 'Layout',
    name: 'goodsRoot',
    meta: {
      title: '商品管理',
      icon: 'Setting',
      roles: ['sys:goodsRoot']
    },
    children: [
      {
        path: '/category',
        component: '/goods/Category',
        name: 'category',
        meta: {
          title: '商品类型',
          icon: 'UserFilled',
          roles: ['sys:category']
        }
      },
      {
        path: '/goodsList',
        component: '/goods/GoodsList',
        name: 'goodsList',
        meta: {
          title: '商品信息',
          icon: 'Wallet',
          roles: ['sys:goodsList']
        }
      }
    ]
  }
])
</script>
<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 230px;
  min-height: 400px;
}
.el-menu {
  border-right: none;
}
:deep(.el-sub-menu .el-sub-menu__title) {
  color: #f4f4f5 !important;
}
:deep(.el-menu .el-menu-item) {
  color: #bfcbd9;
}
/* 菜单点中⽂字的颜⾊ */
:deep(.el-menu-item.is-active) {
  color: #409eff !important;
}
/* 当前打开菜单的所有⼦菜单颜⾊ */
:deep(.is-opened .el-menu-item) {
  background-color: #1f2d3d !important;
}
/* ⿏标移动菜单的颜⾊ */
:deep(.el-menu-item:hover) {
  background-color: #001528 !important;
}
</style>
