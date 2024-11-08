import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 定义选项卡数据类型
export type Tab = {
  title: string
  path: string
}

// 定义state的数据类型
export type TabState = {
  tabList: Tab[]
}

// 定义store
export const useTabStore = defineStore(
  'tabStore',
  () => {
    // 定义state
    const tabList = ref<Tab[]>([])

    // 计算属性获取选项卡列表
    const getTab = computed(() => tabList.value)

    // 添加选项卡数据
    const addTab = (tab: Tab) => {
      // 判断数据是否已存在选项卡列表中
      if (tabList.value.some((item) => item.path === tab.path)) return

      // 首页不能关闭
      if (tab.path === '/dashboard') {
        // 如果是首页，加到第一个，不关闭
        tabList.value.unshift(tab)
      } else {
        tabList.value.push(tab)
      }
    }

    // 返回的对象中应该包含 getTab
    return {
      tabList,
      getTab,
      addTab
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'tabStore', // 自定义持久化的键名
          storage: localStorage // 使用localStorage存储数据
        }
      ]
    }
  }
)
