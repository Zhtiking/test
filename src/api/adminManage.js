import request from '@/utils/request'

export function adminList(data) {
  return request({
    url: '/adminManage/adminList',
    method: 'post',
    data,
  })
}

export function doEdit(data) {
  return request({
    url: '/adminManage/doEdit',
    method: 'post',
    data,
  })
}

export function doDelete(data) {
  return request({
    url: '/adminManage/doDelete',
    method: 'post',
    data,
  })
}
export function doAdd(data) {
  return request({
    url: '/adminManage/doAdd',
    method: 'post',
    data,
  })
}
