/**
 * @description router全局配置，如有必要可分文件抽离
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layouts'
import EmptyLayout from '@/layouts/EmptyLayout'
import { publicPath, routerMode } from '@/config'

Vue.use(VueRouter)

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/401'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true,
  },
]

/*当settings.js里authentication配置的是intelligence时，views引入交给前端配置*/
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/index/index'),
        meta: {
          title: '首页',
          icon: 'home',
          affix: true,
          noKeepAlive: true,
        },
      },
    ],
  },
  {
    path: '/adminmanage',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: '/adminmanage',
        name: 'adminmanage',
        component: () => import('@/views/project/adminmanage/index'),
        meta: {
          title: '管理员设置',
          icon: 'cog',
          permissions: ['admin'],
        },
      },
    ],
  },
  {
    path: '/management',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Management',
    alwaysShow: true,
    meta: { title: '管理中心', icon: 'users-cog' },
    children: [
      {
        path: 'brand',
        name: 'brand',
        component: () => import('@/views/management/brand/index'),
        meta: { title: '品牌管理' },
      },
      {
        path: 'perfumer',
        name: 'perfumer',
        component: () => import('@/views/management/perfumer/index'),
        meta: { title: '调香师管理' },
      },
      {
        path: 'fragrance',
        name: 'fragrance',
        component: () => import('@/views/management/fragrance/index'),
        meta: { title: '香调管理' },
      },
      {
        path: 'perfume',
        name: 'perfume',
        component: () => import('@/views/management/perfume/index'),
        meta: { title: '香水管理' },
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/management/user/index'),
        meta: { title: '用户管理' },
      },
      {
        path: 'article',
        name: 'article',
        component: () => import('@/views/management/article/index'),
        meta: { title: '文章管理' },
      },
      {
        path: 'forum',
        name: 'forum',
        component: () => import('@/views/management/forum/index'),
        meta: { title: '圈子管理' },
      },
      {
        path: 'rotation',
        name: 'rotation',
        component: () => import('@/views/management/rotation_chart/index'),
        meta: { title: '轮播图管理' },
      },
    ],
  },
  {
    path: '/feedback',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: '/feedback',
        name: 'feedback',
        component: () => import('@/views/project/feedback/index'),
        meta: {
          title: '用户反馈',
          icon: 'user-edit',
        },
      },
    ],
  },
  {
    path: '/personalsetting',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: '/personalsetting',
        name: 'personalsetting',
        component: () => import('@/views/project/personalsetting/index'),
        meta: {
          title: '个人中心',
          icon: 'user',
        },
        hidden: true,
      },
    ],
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
]

const router = new VueRouter({
  base: routerMode === 'history' ? publicPath : '',
  mode: routerMode,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRoutes,
})
//注释的地方是允许路由重复点击，如果你觉得框架路由跳转规范太过严格可选择放开
/* const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
}; */

export function resetRouter() {
  router.matcher = new VueRouter({
    base: routerMode === 'history' ? publicPath : '',
    mode: routerMode,
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  }).matcher
}

export default router
