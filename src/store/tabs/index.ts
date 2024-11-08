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
      if (tabList.value.some((item) => item.path === tab.path)) return
      tabList.value.push(tab)
    }

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
