import request from '@/utils/request'

export function perfumeGetlist(data) {
  return request({
    url: '/perfumeGetlist',
    method: 'post',
    data,
  })
}

export function doDelete(data) {
  return request({
    url: 'doDelete',
    method: 'post',
    data,
  })
}

export function addPerfumer(data) {
  return request({
    url: 'addPerfumer',
    method: 'post',
    data,
  })
}
