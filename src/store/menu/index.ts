import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
// 定义 store
export const useMenuStore = defineStore('menuStore', () => {
  // state
  const collapse = ref(false)
  // getters
  const getCollapse = computed(() => collapse.value)
  // actions
  const setCollapse = (newCollapse: boolean) => {
    collapse.value = newCollapse
  }
  return { collapse, getCollapse, setCollapse }
})
