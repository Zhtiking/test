import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/feedback/getList',
    method: 'post',
    data,
  })
}

export function doDelete(data) {
  return request({
    url: '/feedback/doDelete',
    method: 'post',
    data,
  })
}

export function feedBack(data) {
  return request({
    url: '/feedback/feedback',
    method: 'post',
    data,
  })
}
