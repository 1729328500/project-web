<template>
  <el-main>
    <el-button type="primary" icon="Plus" size="default" @click="addBtn"
      >新增</el-button
    >
    <!-- 新增弹框 -->
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
          :inline="false"
          size="default"
        >
          <el-form-item prop="type" label="菜单类型">
            <el-radio-group v-model="addModel.type">
              <el-radio :label="'0'">目录</el-radio>
              <el-radio :label="'1'">菜单</el-radio>
              <el-radio :label="'2'">按钮</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="12" :offset="0">
              <el-form-item label="上级菜单" prop="parentId">
                <el-tree-select
                  @check-change="treeClick"
                  v-model="addModel.parentId"
                  :data="treeList"
                  :render-after-expand="false"
                  show-checkbox
                  check-strictly
                />
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="0">
              <el-form-item label="菜单名称" prop="title">
                <el-input v-model="addModel.title"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="addModel.type != '2'" :gutter="20">
            <el-col :span="12" :offset="0">
              <el-form-item label="菜单图标" prop="icon">
                <el-input v-model="addModel.icon"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="0">
              <el-form-item label="路由名称" prop="name">
                <el-input v-model="addModel.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" :offset="0">
              <el-form-item label="菜单序号" prop="orderNum">
                <el-input v-model="addModel.orderNum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="0">
              <el-form-item label="权限字段" prop="code">
                <el-input v-model="addModel.code"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col v-if="addModel.type != '2'" :span="12" :offset="0">
              <el-form-item label="路由地址" prop="path">
                <el-input v-model="addModel.path"></el-input>
              </el-form-item>
            </el-col>
            <el-col v-if="addModel.type == '1'" :span="12" :offset="0">
              <el-form-item label="组件路径" prop="url">
                <el-input v-model="addModel.url"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
    </SysDialog>
  </el-main>
</template>

<script setup lang="ts">
import SysDialog from '@/components/SysDialog.vue'
import useDialog from '@/hooks/useDialog'
import { ElMessage, FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'
import { getParentApi, addApi } from '@/api/menu/index'

//表单ref属性
const addForm = ref<FormInstance>()
//弹框属性
const { dialog, onClose, onShow } = useDialog()

//获取上级菜单数据
const treeList = ref([])
const getParent = async () => {
  let res = await getParentApi()
  if (res && res.code == 200) {
    treeList.value = res.data
  }
}
//新增按钮
const addBtn = () => {
  //获取上级菜单
  getParent()
  //显示弹框
  onShow()
}
//表单绑定的对象
const addModel = reactive({
  menuId: '',
  parentId: '',
  title: '',
  code: '',
  name: '',
  path: '',
  url: '',
  type: '',
  icon: '',
  parentName: '',
  orderNum: ''
})
//上级菜单选中事件
const treeClick = (item: any) => {
  console.log(item)
  addModel.parentName = item.title
}
//表单验证规则
const rules = reactive({
  parentId: [
    {
      required: true,
      trigger: ['blur', 'change'],
      message: '请选择上级菜单'
    }
  ],
  title: [
    {
      required: true,
      trigger: ['blur', 'change'],
      message: '请填写菜单名称'
    }
  ],
  code: [
    {
      required: true,
      trigger: ['blur', 'change'],
      message: '请填写权限字段'
    }
  ],
  name: [
    {
      required: true,
      trigger: ['blur', 'change'],
      message: '请填写路由名称'
    }
  ],
  path: [
    {
      required: true,
      trigger: ['blur', 'change'],
      message: '请填写路由地址'
    }
  ],
  url: [
    {
      required: true,
      trigger: ['blur', 'change'],
      message: '请填写组件路径'
    }
  ],
  type: [
    {
      required: true,
      trigger: ['blur', 'change'],
      message: '请选择菜单类型'
    }
  ],
  icon: [
    {
      required: true,
      trigger: ['blur', 'change'],
      message: '请填写菜单图标'
    }
  ],
  orderNum: [
    {
      required: true,
      trigger: ['blur', 'change'],
      message: '请填写菜单序号'
    }
  ]
})
//表单提交
const commit = () => {
  addForm.value?.validate(async (valid) => {
    if (valid) {
      console.log('验证通过')
      console.log(addModel)
      let res = await addApi(addModel)
      if (res && res.code == 200) {
        ElMessage.success(res.msg)
        onClose()
      }
    }
  })
}
</script>

<style scoped></style>
