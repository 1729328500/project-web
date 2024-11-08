<template>
  <el-tabs
    v-model="activeTab"
    type="card"
    class="demo-tabs"
    closable
    @tab-remove="removeTab"
    @tab-click="clickBtn"
  >
    <el-tab-pane
      v-for="item in tabsList"
      :key="item.path"
      :label="item.title"
      :name="item.path"
    >
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { Tab, useTabStore } from '@/store/tabs/index'
import { useRoute, useRouter } from 'vue-router'
import { TabsPaneContext } from 'element-plus'

const router = useRouter()
const route = useRoute()

const store = useTabStore()
const activeTab = ref('')
const tabsList = computed(() => store.getTab)

const clickBtn = (pane: TabsPaneContext) => {
  const { props } = pane
  router.push({ path: props.name as string })
}

const removeTab = (targetName: string) => {
  const tabs = tabsList.value
  const index = tabs.findIndex((tab) => tab.path === targetName)
  const nextTab = tabs[index + 1] || tabs[index - 1]
  if (nextTab) {
    activeTab.value = nextTab.path
  }
  store.tabList = tabs.filter((tab: Tab) => tab.path !== targetName)
  router.push({ path: activeTab.value })
}

const addTab = () => {
  const { path, meta } = route
  const tab: Tab = {
    path,
    title: meta.title as string
  }
  store.addTab(tab)
}

watch(
  () => route.path,
  () => {
    setActiveTab()
    addTab()
  }
)

const setActiveTab = () => {
  activeTab.value = route.path
}

onMounted(() => {
  setActiveTab()
  addTab()
})
</script>

<style scoped lang="scss">
:deep(.el-tabs__header) {
  line-height: 26px !important;
  text-align: center !important;
  border: 1px solid #d8dce5 !important;
  margin: 0px 3px !important;
  color: #495060 !important;
  font-size: 12px !important;
  padding: 0px 10px !important;
}

:deep(.el-tabs__nav) {
  border: none !important;
}

:deep(.is-active) {
  border-bottom: 1px solid transparent !important;
  border: 1px solid #42b983 !important;
  background-color: #42b983 !important;
  color: #fff !important;
}

:deep(.el-tabs__item:hover) {
  color: #495060 !important;
}

:deep(.is-active:hover) {
  color: #fff !important;
}

:deep(.el-tabs__nav-next),
:deep(.el-tabs__nav-prev) {
  line-height: 26px !important;
}
</style>
