<template>
  <el-main>
    <!-- 搜索栏 -->
    <el-form :model="searchParm" inline="true" size="default">
      <el-form-item>
        <el-input placeholder="请输入姓名" v-model="searchParm.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          placeholder="请输入电话"
          v-model="searchParm.phone"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="Search">搜索</el-button>
        <el-button icon="Close" type="danger" plain>重置</el-button>
        <el-button icon="Plus" type="primary" @click="addBtn">新增</el-button>
      </el-form-item>
    </el-form>

    <!-- 新增编辑框 -->
    <SysDialog
      :title="dialog.title"
      :width="dialog.width"
      :height="dialog.height"
      :visible="dialog.visible"
      @on-close="onClose"
      @on-confirm="commit"
    >
      <template v-slot:content>
        <el-form
          :model="addModel"
          ref="addForm"
          :rules="rules"
          label-width="80px"
          inline="false"
          size="default"
        >
          <el-row>
            <el-col :span="12" :offset="0">
              <el-form-item prop="nickName" label="昵称: ">
                <el-input v-model="addModel.nickName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="0">
              <el-form-item prop="sex" label="性别: ">
                <el-radio-group v-model="addModel.gender">
                  <el-radio :label="0">男</el-radio>
                  <el-radio :label="1">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12" :offset="0">
              <el-form-item prop="phone" label="电话: ">
                <el-input v-model="addModel.phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="0">
              <el-form-item prop="email" label="邮箱: ">
                <el-input v-model="addModel.email"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12" :offset="0">
              <el-form-item prop="username" label="账户: ">
                <el-input v-model="addModel.username"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="0">
              <el-form-item prop="password" label="密码: ">
                <el-input v-model="addModel.password"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
    </SysDialog>
  </el-main>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import useDialog from '@/hooks/useDialog'
import SysDialog from '@/components/SysDialog.vue'
import { FormInstance } from 'element-plus'

// 表单ref属性
const addForm = ref<FormInstance>()

// 弹框属性
const { dialog, onClose, onShow } = useDialog()

// 搜索栏相关对象
const searchParm = reactive({
  phone: '',
  nickName: '',
  currentPage: 1,
  pageSize: 10
})

// 新增绑定对象
const addModel = reactive({
  userId: '',
  username: '',
  password: '',
  phone: '',
  email: '',
  gender: '0',
  nickName: ''
})
//表单验证规则
const rules = reactive({
  nickName: [
    {
      required: true,
      trigger: ['blur', 'change'],
      message: '请输入姓名'
    }
  ],
  gender: [
    {
      required: true,
      trigger: ['blur', 'change'],
      message: '请选择性别'
    }
  ],
  phone: [
    {
      required: true,
      trigger: ['blur', 'change'],
      message: '请输入电话'
    }
  ],
  username: [
    {
      required: true,
      trigger: ['blur', 'change'],
      message: '请输入账户'
    }
  ],
  password: [
    {
      required: true,
      trigger: ['blur', 'change'],
      message: '请输入密码'
    }
  ]
})
//新增按钮
const addBtn = () => {
  dialog.title = '新增'
  dialog.height = 180
  onShow()
}
//提交表单
const commit = () => {
  // 验证表单
  addForm.value?.validate((valid) => {
    if (valid) {
      console.log('验证通过')
    }
  })
}
</script>
