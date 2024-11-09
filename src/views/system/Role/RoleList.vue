<template>
  <el-main>
    <!-- 搜索栏 -->
    <el-form :model="searchParm" :inline="true" size="default">
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
        <template #default="scope">
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
      background
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
          :inline="false"
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
import { ElMessage, FormInstance } from 'element-plus'
import { addApi, getListApi, editApi } from '@/api/role'
import { SysRole } from '@/api/role/RoleModel'

// 表单ref实例
const addRef = ref<FormInstance>()
// 弹框属性
const { dialog, onClose, onShow } = useDialog()

// 表单绑定的对象
const searchParm = reactive({
  currentPage: 1,
  pageSize: 10,
  roleName: '',
  total: 0
})
// 判断新增还是编辑的标识 0:新增 1:编辑
const tags = ref('')

// 新增按钮
const addBtn = () => {
  tags.value = '0'
  dialog.title = '新增'
  dialog.height = 180
  // 显示弹框
  onShow()
  // 清空表单
  addRef.value?.resetFields()
}

// 新增表单对象
const addModel = reactive({
  roleId: '',
  roleName: '',
  remark: ''
})

// 表单验证规则
const rules = reactive({
  roleName: [
    {
      required: true,
      message: '请输入角色名称',
      trigger: 'change'
    }
  ]
})

// 表单提交
const commit = () => {
  addRef.value?.validate(async (valid) => {
    if (valid) {
      console.log('表单验证通过')
      // 提交请求
      let res = null
      if (tags.value == '0') {
        // 新增
        res = await addApi(addModel)
      } else {
        // 编辑
        res = await editApi(addModel)
      }
      if (res && res.code === 200) {
        ElMessage.success(res.msg)
        // 刷新列表
        getList()
        // 关闭弹框
        onClose()
      }
    }
  })
}

// 编辑按钮
const editBtn = (row: SysRole) => {
  tags.value = '1'
  console.log(row)
  // 显示弹框
  dialog.visible = true
  dialog.title = '编辑'
  dialog.height = 180
  nextTick(() => {
    // 回显数据
    Object.assign(addModel, row)
  })
  // 清空表单
  addRef.value?.resetFields()
}

// 删除按钮
const deleteBtn = (roleId: string) => {
  console.log(roleId)
}

// 页容量改变时触发
const sizeChange = (size: number) => {
  searchParm.pageSize = size
  getList()
}

// 当前页改变时触发
const currentChange = (page: number) => {
  searchParm.currentPage = page
  getList()
}

// 表格高度
const tableHeight = ref(0)

// 表格数据
const tableList = ref([])

// 查询列表
const getList = async () => {
  let res = await getListApi(searchParm)
  if (res && res.code === 200) {
    // 设置表格数据
    console.log(res)
    tableList.value = res.data.records
    // 设置分页总条数
    searchParm.total = res.data.total
  }
}
// 搜索
const searchBtn = () => {
  getList()
}

// 重置
const resetBtn = () => {
  searchParm.roleName = ''
  searchParm.currentPage = 1
  getList()
}

// 页面加载时调用
onMounted(() => {
  nextTick(() => {
    tableHeight.value = window.innerHeight - 230
  })
  getList()
})
</script>
