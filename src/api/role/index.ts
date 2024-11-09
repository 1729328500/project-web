import http from '@/http'
import { SysRole } from './RoleModel'

export const addApi = (parm: SysRole) => {
  return http.post('/api/role', parm)
}
