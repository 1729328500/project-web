<template>
  <el-container class="layout">
    <el-aside width="auto" class="aside">
      <menu-bar></menu-bar>
    </el-aside>
    <el-container>
      <el-header class="header">
        <Header></Header>
      </el-header>
      <el-main class="main">
        <div class="tabs">
          <Tabs class="tabs-content"></Tabs>
          <ColseTabs></ColseTabs>
        </div>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Header from '@/layout/header/Header.vue'
import MenuBar from '@/layout/menu/MenuBar.vue'
import Tabs from '@/layout/tabs/Tabs.vue'
import ColseTabs from '@/layout/tabs/ColseTabs.vue'
</script>

<style lang="scss">
.layout {
  height: 100%;

  .aside {
    background-color: #2c3e50; // 左侧菜单栏的背景色
  }

  .header {
    display: flex;
    align-items: center;
    background-color: #009688; // 顶部导航的背景色
  }

  .main {
    background-color: #f7f7f7; // 主内容区域的背景色

    .tabs {
      display: flex;
      justify-content: space-between;
      flex-grow: 1;
      border-bottom: 1px solid #e4e7ed;
      padding-right: 75px; // 右侧内边距
    }

    .tabs-content {
      padding-top: 8px;
      padding-left: 10px;
      padding-right: 10px;
    }
  }
}
</style>
