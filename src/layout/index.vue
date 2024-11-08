<template>
  <el-container class="layout">
    <el-aside width="auto" class="asside">
      <menu-bar></menu-bar>
    </el-aside>
    <el-container>
      <el-header class="header">
        <Header></Header>
      </el-header>
      <el-main class="main">
        <Tabs></Tabs>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import Header from '@/layout/header/Header.vue'
import MenuBar from '@/layout/menu/MenuBar.vue'
import Tabs from '@/layout/tabs/Tabs.vue'
</script>
<style lang="scss">
.mycontainer {
  height: 100%;
  .leftmenu {
    background-color: #304156;
  }
}
.layout {
  height: 100%;
  .asside {
    background-color: #304156;
  }
  .header {
    display: flex;
    align-items: center;
    background-color: #009688;
  }
  .main {
    background-color: rgb(247, 247, 247);
  }
}
</style>
