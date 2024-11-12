<template>
  <el-dropdown placement="bottom-start">
    <span class="el-dropdown-link">
      <img class="userimg" src="@/assets/user.png" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="updateBtn">修改密码</el-dropdown-item>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- 修改密码弹框 -->
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
        :model="upModel"
        ref="form"
        :rules="rules"
        label-width="80px"
        :inline="false"
        size="default"
      >
        <el-form-item prop="oldPassword" label="原密码">
          <el-input type="password" v-model="upModel.oldPassword"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="新密码">
          <el-input type="password" v-model="upModel.password"></el-input>
        </el-form-item>
        <el-form-item prop="confirm" label="确定密码">
          <el-input type="password" v-model="upModel.confirm"></el-input>
        </el-form-item>
      </el-form>
    </template>
  </SysDialog>
</template>

<script setup lang="ts">
import SysDialog from '@/components/SysDialog.vue'
import useDialog from '@/hooks/useDialog'
import { ElMessage, FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'
import { updatePasswordApi } from '@/api/user/index'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'

const store = useUserStore()
const router = useRouter()

// 表单ref属性
const form = ref<FormInstance>()

// 弹框属性
const { dialog, onClose, onShow } = useDialog()

// 修改密码
const updateBtn = () => {
  dialog.title = '修改密码'
  dialog.height = 180
  onShow()
}

// 表单对象
const upModel = reactive({
  userId: '',
  oldPassword: '',
  password: '',
  confirm: ''
})

// 表单验证规则
const rules = reactive({
  oldPassword: [
    {
      required: true,
      trigger: ['blur', 'change'],
      message: '请输入原密码'
    }
  ],
  password: [
    {
      required: true,
      trigger: ['blur', 'change'],
      message: '请输入新密码'
    }
  ],
  confirm: [
    {
      required: true,
      trigger: ['blur', 'change'],
      message: '请输入确定密码'
    }
  ]
})

// 表单提交
const commit = async () => {
  upModel.userId = store.getUserId
  form.value?.validate(async (valid) => {
    if (valid) {
      // 判断新密码和确定密码是否一致
      if (upModel.password !== upModel.confirm) {
        ElMessage.warning('新密码和确定密码不一致!')
        return
      }
      let res = await updatePasswordApi(upModel)
      if (res && res.code === 200) {
        ElMessage.success(res.msg)
        // 清空缓存
        sessionStorage.clear()
        // 跳转去登录
        router.push({ path: '/login' })
      }
    }
  })
}
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
