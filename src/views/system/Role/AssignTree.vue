<template>
  <SysDialog
    :title="dialog.title"
    :width="dialog.width"
    :height="dialog.height"
    :visible="dialog.visible"
    @on-close="onClose"
    @on-confirm="commit"
  >
    <template v-slot:content>
      <el-tree
        show-checkbox
        default-expand-all
        :default-checked-keys="assignTreeData.assignTreeChecked"
        :data="assignTreeData.list"
        :props="defaultProps"
      />
    </template>
  </SysDialog>
</template>

<script setup lang="ts">
import { getAssignTreeApi } from '@/api/user/index'
import { reactive } from 'vue'
import SysDialog from '@/components/SysDialog.vue'
import useDialog from '@/hooks/useDialog'
import { useUserStore } from '@/store/user'
const store = useUserStore()
const { dialog, onClose, onShow } = useDialog()
//树的属性配置
const defaultProps = {
  children: 'children',
  label: 'title'
}
//树数据
const assignTreeData = reactive({
  list: [],
  assignTreeChecked: []
})
//树数据查询的参数
const parms = reactive({
  userId: '',
  roleId: ''
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const checked = (id: number, data: any, newArr: any) => {
  data.forEach((item: any) => {
    if (item.menuId == id) {
      if (item.children && item.children.length == 0) {
        newArr.push(item.menuId)
      }
    } else {
      if (item.children && item.children.length != 0) {
        //递归调用
        checked(id, item.children, newArr)
      }
    }
  })
}
//查询菜单树
const getAssignTree = async () => {
  let res = await getAssignTreeApi(parms)
  if (res && res.code == 200) {
    assignTreeData.list = res.data.menuList
    assignTreeData.assignTreeChecked = res.data.checkList
    //数据回显，判断角色原来是否已经分配过权限，如果有，回显
    if (assignTreeData.assignTreeChecked.length > 0) {
      let newArr: any = []
      assignTreeData.assignTreeChecked.forEach((item) => {
        checked(item, assignTreeData.list, newArr)
      })
      assignTreeData.assignTreeChecked = newArr
    }
  }
}
//弹框显示
const show = async (roleId: string, name: string) => {
  assignTreeData.assignTreeChecked = []
  assignTreeData.list = []
  parms.roleId = roleId
  parms.userId = store.getUserId
  //设置弹框属性
  dialog.width = 600
  dialog.height = 400
  dialog.title = '为【' + name + '】分配菜单'
  //获取树数据
  await getAssignTree()
  onShow()
}
//暴露出去，给外部组件使用
defineExpose({
  show
})
//提交表单
const commit = () => {}
</script>

<style scoped></style>
