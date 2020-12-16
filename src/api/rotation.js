import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/rotation/getList',
    method: 'post',
    data,
  })
}

export function doDelete(data) {
  return request({
    url: '/rotation/doDelete',
    method: 'post',
    data,
  })
}

export function addRotation(data) {
  return request({
    url: '/rotation/addRotation',
    method: 'post',
    data,
  })
}
