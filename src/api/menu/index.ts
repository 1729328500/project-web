import http from '@/http'

//获取上级菜单
export const getParentApi = () => {
  return http.get('/api/sysMenu/getParent')
}
