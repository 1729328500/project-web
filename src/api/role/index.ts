import http from '@/http'
import { SysRole, RoleListParm } from './RoleModel'

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
