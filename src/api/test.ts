import request from '@/utils/request'

// mock test api
export const test = () => {
  return request({
    url: '/mock/test',
    method: 'get'
  })
}
