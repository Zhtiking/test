import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/fragrance/getList',
    method: 'post',
    data,
  })
}

export function fragranceList(data) {
  return request({
    url: '/fragrance/fragranceList',
    method: 'post',
    data,
  })
}

export function doDelete(data) {
  return request({
    url: '/fragrance/doDelete',
    method: 'post',
    data,
  })
}

export function addFragrance(data) {
  return request({
    url: '/fragrance/addFragrance',
    method: 'post',
    data,
  })
}
