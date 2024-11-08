<template>
  <el-breadcrumb class="bred" separator="/">
    <el-breadcrumb-item v-for="(item, index) in tabs" :key="index">
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref, Ref, watch } from 'vue'
import { useRoute, RouteLocationMatched } from 'vue-router'

const route = useRoute()

// 定义面包屑导航数据
const tabs: Ref<RouteLocationMatched[]> = ref([])

// 获取面包屑数据
const getBreadcrumb = () => {
  let machled = route.matched.filter((item) => item.meta && item.meta.title)

  // 获取第一个数据
  const first = machled[0]
  // 判断是否是首页，不是，自已构造
  if (first.path !== '/dashboard') {
    machled = [{ path: '/dashboard', meta: { title: '首页' } } as any].concat(
      machled
    )
  }

  tabs.value = machled
}

getBreadcrumb()
// 监听当前路由
watch(
  () => route.path,
  () => getBreadcrumb()
)
</script>

<style scoped lang="scss">
.bred {
  margin-left: 20px;
}
// 修改字体颜色
:deep(.el-breadcrumb__inner) {
  color: #fff !important;
}
:deep(.el-breadcrumb__inner a) {
  color: #fff !important;
}
// 修改字体大小
:deep(.el-breadcrumb__item) {
  font-size: 16px !important;
}
</style>
