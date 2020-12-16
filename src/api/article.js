import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/article/getList',
    method: 'post',
    data,
  })
}

export function doDelete(data) {
  return request({
    url: '/article/doDelete',
    method: 'post',
    data,
  })
}

export function addArticle(data) {
  return request({
    url: '/article/addArticle',
    method: 'post',
    data,
  })
}

export function ArticleList(data) {
  return request({
    url: '/article/ArticleList',
    method: 'post',
    data,
  })
}
