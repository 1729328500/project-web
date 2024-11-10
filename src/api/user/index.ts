import http from '@/http'
import { User } from './UserModel'

// 新增
export const addApi = (parm: User) => {
  return http.post('/api/sysUser', parm)
}
