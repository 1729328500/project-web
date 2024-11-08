<template>
  <div class="close">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-icon size="20" class="el-icon--right">
          <Close />
        </el-icon>
        关闭
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>关闭当前</el-dropdown-item>
          <el-dropdown-item>关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.close {
  width: 60px;
  height: 40px;
  position: fixed;
  top: 100;
  right: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid #e4e7ed;
  padding-right: 10px;
}
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-dropdown-link:focus {
  outline: none;
}
</style>
