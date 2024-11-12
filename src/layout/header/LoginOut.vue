<template>
  <el-dropdown placement="bottom-start">
    <span class="el-dropdown-link">
      <img class="userimg" src="@/assets/user.png" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>修改密码</el-dropdown-item>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
// 脚本内容
</script>

<style scoped lang="scss">
.el-dropdown-link:focus {
  outline: none;
}

.userimg {
  height: 45px;
  width: 45px;
  border-radius: 50%;
  cursor: pointer;
  background-color: #fff;
}
</style>
