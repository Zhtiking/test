import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/userList',
    method: 'post',
    data,
  })
}

export function doDelete(data) {
  return request({
    url: '/deletUser',
    method: 'post',
    data,
  })
}
