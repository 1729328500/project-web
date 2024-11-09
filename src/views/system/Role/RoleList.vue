<template>
  <el-main>
    <!-- 搜索栏 -->
    <el-form :model="searchParm" inline="true" size="default">
      <el-form-item>
        <el-input
          placeholder="请输入关键字"
          v-model="searchParm.roleName"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="Search" @click="searchBtn">搜索</el-button>
        <el-button icon="Close" type="danger" plain @click="resetBtn"
          >重置</el-button
        >
        <el-button icon="Plus" type="primary" @click="addBtn">新增</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格数据 -->
    <el-table :height="tableHeight" :data="tableList" border stripe>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column label="操作" width="220" align="center">
        <template v-slot:default="scope">
          <el-button
            type="primary"
            icon="Edit"
            size="default"
            @click="editBtn(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            icon="Delete"
            size="default"
            @click="deleteBtn(scope.row.roleId)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      v-model:current-page="searchParm.currentPage"
      :page-sizes="[10, 20, 40, 80, 100]"
      :page-size="searchParm.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="searchParm.total"
    >
    </el-pagination>

    <!-- 新增、编辑弹框 -->
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
          ref="addRef"
          :rules="rules"
          label-width="80px"
          size="default"
        >
          <el-form-item prop="roleName" label="角色名称">
            <el-input v-model="addModel.roleName"></el-input>
          </el-form-item>
          <el-form-item prop="remark" label="备注">
            <el-input v-model="addModel.remark"></el-input>
          </el-form-item>
        </el-form>
      </template>
    </SysDialog>
  </el-main>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue'
import SysDialog from '@/components/SysDialog.vue'
import useDialog from '@/hooks/useDialog'
import { FormInstance } from 'element-plus'
import { addApi, getListApi } from '@/api/role'

const addRef = ref<FormInstance>()
const { dialog, onClose, onShow } = useDialog()
const searchParm = reactive({
  currentPage: 1,
  pageSize: 10,
  roleName: '',
  total: 0
})

const addModel = reactive({
  roleId: '',
  roleName: '',
  remark: ''
})

const rules = reactive({
  roleName: [{ required: true, message: '请输入角色名称', trigger: 'change' }]
})

const commit = async () => {
  addRef.value?.validate(async (valid) => {
    if (valid) {
      console.log('表单验证通过')
      // 发送新增请求
      let res = await addApi(addModel)
      // 处理响应
    }
  })
}

const searchBtn = () => {
  getList()
}

const resetBtn = () => {
  searchParm.roleName = ''
  searchParm.currentPage = 1
  getList()
}

const sizeChange = (size) => {
  searchParm.pageSize = size
  getList()
}

const currentChange = (page) => {
  searchParm.currentPage = page
  getList()
}

const tableHeight = ref(0)
const tableList = ref([])

const getList = async () => {
  let res = await getListApi(searchParm)
  if (res && res.code === 200) {
    tableList.value = res.data.records
    searchParm.total = res.data.total
  }
}

onMounted(() => {
  nextTick(() => {
    tableHeight.value = window.innerHeight - 230
  })
  getList()
})
</script>
