import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/perfume/getList',
    method: 'post',
    data,
  })
}

export function doDelete(data) {
  return request({
    url: '/perfume/doDelete',
    method: 'post',
    data,
  })
}

export function addPerfume(data) {
  return request({
    url: '/perfume/addPerfume',
    method: 'post',
    data,
  })
}
