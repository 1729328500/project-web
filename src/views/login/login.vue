<template>
  <div class="logincontainer">
    <el-form
      class="loginform"
      :model="loginModel"
      :rules="rules"
      ref="form"
      :inline="false"
      size="large"
    >
      <el-form-item>
        <div class="logintitle">系统登录</div>
      </el-form-item>
      <el-form-item prop="username">
        <el-input
          placeholder="请输入账户"
          v-model="loginModel.username"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          placeholder="请输入密码"
          v-model="loginModel.password"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-row :gutter="10">
          <el-col :span="16" :offset="0">
            <el-input
              placeholder="请输入验证码"
              v-model="loginModel.code"
            ></el-input>
          </el-col>
          <el-col :span="8" :offset="0">验证码</el-col>
        </el-row>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12" :offset="0">
          <el-button class="mybtn" type="primary">登录</el-button>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-button type="danger" plain class="mybtn">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'

// 表单 ref 属性
const form = ref<FormInstance>()

// 表单绑定对象
const loginModel = reactive({
  username: '',
  password: '',
  code: ''
})

// 表单验证规则
const rules = reactive({})
</script>

<style scoped lang="scss">
.logincontainer {
  height: 100%;
  background-color: #fff;
  background-image: url('@/assets/login.jpg');
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .loginform {
    height: 320px;
    width: 450px;
    padding: 20px 35px;
    border-radius: 10px;
    background-color: #fff;
    .logintitle {
      display: flex;
      justify-content: center;
      color: #606266;
      width: 100%;
      font-size: 24px;
      font-weight: 600;
    }
    .images {
      height: 40px;
      width: 100%;
      cursor: pointer;
    }
    .mybtn {
      width: 100%;
    }
  }
}
</style>
