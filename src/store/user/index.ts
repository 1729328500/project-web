import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getInfoApi } from '@/api/user'
import { resolve } from 'path'
import { rejects } from 'assert'

// 定义 store: 使用组合式 API 风格
export const useUserStore = defineStore(
  'userStore',
  () => {
    // 状态变量: 我们将直接使用 ref() 来定义响应式状态
    const userId = ref('')
    const nickName = ref('')
    const token = ref('')
    const codeList = ref([])

    // 使用 computed 来获取状态的值
    const getUserId = computed(() => userId.value)
    const getNickName = computed(() => nickName.value)
    const getToken = computed(() => token.value)
    const getCodeList = computed(() => codeList.value)

    // 使用函数来修改状态
    const setUserId = (newUserId: string) => {
      userId.value = newUserId
    }

    const setNickName = (newNickName: string) => {
      nickName.value = newNickName
    }

    const setToken = (newToken: string) => {
      token.value = newToken
    }

    const getInfo = () => {
      return new Promise((resolve, reject) => {
        getInfoApi(userId.value)
          .then((res) => {
            if (res && res.code === 200) {
              codeList.value = res.data.permissions
              resolve(codeList.value)
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    }

    // 返回需要暴露的 state、getters 和 actions

    // 返回需要暴露的 state, getters 和 actions
    return {
      userId,
      nickName,
      token,
      codeList,
      getUserId,
      getNickName,
      getToken,
      getCodeList,
      setUserId,
      setNickName,
      setToken,
      getInfo
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'userInfo', // 自定义持久化的键名
          storage: localStorage // 使用 localStorage 存储数据
        }
      ]
    }
  }
)
