import request from '@/utils/request'

export function personInfo(data) {
  return request({
    url: '/personInfo',
    method: 'post',
    data,
  })
}
