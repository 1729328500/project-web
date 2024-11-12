import http from '@/http'
import { SysRole, RoleListParm, SaveMenuParm } from './RoleModel'

export const addApi = (parm: SysRole) => {
  return http.post('/api/role', parm)
}

// 角色列表
export const getListApi = (parm: RoleListParm) => {
  return http.post('/api/role/getList', parm)
}
export const editApi = (parm: SysRole) => {
  return http.put('/api/role', parm)
}

export const deleteApi = (roleId: string) => {
  return http.delete(`/api/role/${roleId}`)
}

// 角色下拉
export const getSelectApi = () => {
  return http.get('/api/role/selectList')
}
//分配菜单保存
export const saveRoleMenuApi = (parm: SaveMenuParm) => {
  return http.post('/api/role/saveRoleMenu', parm)
}
