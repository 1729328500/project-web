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
