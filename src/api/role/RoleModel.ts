export type SysRole = {
  roleId: string
  roleName: string
  remark: string
}

export type RoleListParm = {
  currentPage: number
  pageSize: number
  roleName: string
  total: number
}
//分配菜单数据类型
export type SaveMenuParm = {
  roleId: string
  list: Array<string>
}
