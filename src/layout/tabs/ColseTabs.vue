<template>
  <div class="close">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-icon size="20" class="el-icon--right">
          <Close />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="closeCurrent">关闭当前</el-dropdown-item>
          <el-dropdown-item @click="closeAll">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useTabStore, Tab } from '@/store/tabs'

const store = useTabStore()
const route = useRoute()
const router = useRouter()

// 关闭当前标签
const closeCurrent = () => {
  const targetName = route.path
  // 首页不关闭
  if (targetName === '/dashboard') return

  // 获取选项卡数据
  const tabs: Tab[] = store.getTab() // 确保 tabs 的类型明确
  let activeName = route.path
  if (activeName === targetName) {
    tabs.forEach((tab: Tab, index: number) => {
      if (tab.path === targetName) {
        const nextTab: Tab | undefined = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.path
        }
      }
    })
  }

  // 重新设置选项卡数据
  store.tabList = tabs.filter((tab) => tab.path !== targetName)
  // 跳转路由
  router.push({ path: activeName })
}

// 关闭所有标签
const closeAll = () => {
  store.tabList.splice(0, store.tabList.length)
  // 跳转首页
  router.push({ path: '/dashboard' })
}
</script>
