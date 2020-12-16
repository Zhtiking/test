import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/brand/getList',
    method: 'post',
    data,
  })
}
export function brandList(data) {
  return request({
    url: '/brand/brandList',
    method: 'post',
    data,
  })
}

export function doDelete(data) {
  return request({
    url: '/brand/doDelete',
    method: 'post',
    data,
  })
}

export function addBrand(data) {
  return request({
    url: '/brand/addBrand',
    method: 'post',
    data,
  })
}
