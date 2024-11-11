<template>
  <el-main>
    <el-button type="primary" icon="Plus" size="default" @click="addBtn"
      >新增</el-button
    >
    <!-- 新增弹框 -->
    <SysDialog
      title="新增"
      :width="dialog.width"
      :height="dialog.height"
      :visible="dialog.visible"
      @on-close="onClose"
      @on-confirm="onConfirm"
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
          <el-form-item label="菜单类型">
            <el-radio-group v-model="addModel.type">
              <el-radio :label="'0'">目录</el-radio>
              <el-radio :label="'1'">菜单</el-radio>
              <el-radio :label="'2'">按钮</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-row :gutter="20">
            <el-col :span="12" :offset="0">
              <el-form-item label="上级菜单" prop="">
                <el-tree-select
                  v-model="addModel.parentId"
                  :data="treeList"
                  :render-after-expand="false"
                  show-checkbox
                />
              </el-form-item>
            </el-col>

            <el-col :span="12" :offset="0">
              <el-form-item label="菜单名称" prop="">
                <el-input v-model="addModel.title"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row v-if="addModel.type != '2'" :gutter="20">
            <el-col :span="12" :offset="0">
              <el-form-item label="菜单图标" prop="">
                <el-input v-model="addModel.icon"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12" :offset="0">
              <el-form-item label="路由名称" prop="">
                <el-input v-model="addModel.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12" :offset="0">
              <el-form-item label="菜单序号" prop="">
                <el-input v-model="addModel.orderNum"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12" :offset="0">
              <el-form-item label="权限字段" prop="">
                <el-input v-model="addModel.code"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col v-if="addModel.type != '2'" :span="12" :offset="0">
              <el-form-item label="路由地址" prop="">
                <el-input v-model="addModel.path"></el-input>
              </el-form-item>
            </el-col>

            <el-col v-if="addModel.type == '1'" :span="12" :offset="0">
              <el-form-item label="组件路径" prop="">
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
import { FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'
import { getParentApi } from '@/api/menu/index'
//表单ref属性
const addForm = ref<FormInstance>()
//弹框属性
const { dialog, onClose, onConfirm, onShow } = useDialog()

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
  type: '0',
  icon: '',
  parentName: '',
  orderNum: ''
})
//表单验证规则
const rules = reactive({})
</script>

<style scoped></style>
