import request from '@/utils/request'

export const getInfo = () => {
  return request({
    url: '/user/info',
    method: 'get'
  })
}
