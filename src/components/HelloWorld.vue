<template>
  <h1>{{ store.count }}</h1>
  <h2>{{ count }}</h2>
  <h2>{{ msg }}</h2>
  <el-button type="primary" size="default" @click="addBtn">新增</el-button>
</template>

<script setup lang="ts">
import { useTestStore } from '@/store'
import { storeToRefs } from 'pinia'

// 使用 storeToRefs 批量解构 Store 中的响应式数据
const store = useTestStore()
const { count, msg } = storeToRefs(store)

const addBtn = () => {
  // 第一种改变数据的方式
  // store.count++;

  // 第二种改变数据的方式
  // store.setCount(++store.count);

  // 第三种改变数据的方式
  // store.$patch({
  //   count: ++store.count,
  // });

  // 第四种改变数据的方式
  store.$patch((state: any) => {
    state.count = ++state.count
  })
}
</script>
