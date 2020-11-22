import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* Layout */
import Layout from '../layout/Layout'

const routes = [
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('@/views/Index'),
        meta: {title:'首页', icon: 'el-icon-s-marketing', requireAuth: false}
      }
    ]
  },
  {
    path: '/articleveryfi',
    component: Layout,
    children: [
      {
        path: '',
        name: 'articleveryfiIndex',
        component: () => import('@/views/Index'),
        meta: {title:'内容审核入口', icon: 'el-icon-finished', requireAuth: false}
      }
    ]
  },
  {
    path: '/usermanage',
    component: Layout,
    meta: {
      title: '用户管理',
      icon: 'el-icon-s-custom'
    },
    children: [
      {
        path: '',
        name: 'usermanageIndex',
        component: () => import('@/views/Index'),
        meta: {title:'全部用户', icon: 'el-icon-s-data', requireAuth: false}
      },
      {
        path: 'add',
        name: 'usermanageAdd',
        component: () => import('@/views/Index'),
        meta: {title:'异常用户', icon: 'el-icon-circle-plus', requireAuth: false}
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    meta: {
      title: '文章管理',
      icon: 'el-icon-document-copy'
    },
    children: [
      {
        path: '',
        name: 'articleIndex',
        component: () => import('@/views/article/list.vue'),
        meta: {title:'全部文章', icon: 'el-icon-s-data', requireAuth: false}
      },
      {
        path: 'add',
        name: 'articleAdd',
        component: () => import('@/views/Index'),
        meta: {title:'异常文章', icon: 'el-icon-circle-plus', requireAuth: false}
      },
      {
        path: 'itemmanager',
        name: 'articlemanager',
        component: () => import('@/views/article/articlemanager.vue'),
        hidden: true,
        meta: {title:'文章管理', icon: 'el-icon-circle-plus', requireAuth: false}
      }
    ]
  },
  {
    path: '/article_category',
    component: Layout,
    meta: {
      title: '投稿类目分类管理',
      icon: 'el-icon-collection'
    },
    children: [
      {
        path: '',
        name: 'article_categoryIndex',
        component: () => import('@/views/article_category/index.vue'),
        meta: {title:'全部', icon: 'el-icon-s-data', requireAuth: false}
      },
      {
        path: 'add',
        name: 'article_categoryAdd',
        component: () => import('@/views/article_category/add.vue'),
        meta: {title:'新增', icon: 'el-icon-circle-plus', requireAuth: false}
      }
    ]
  },
  {
    path: '/tagmanage',
    component: Layout,
    meta: {
      title: 'TAG标签管理',
      icon: 'el-icon-discount'
    },
    children: [
      {
        path: '',
        name: 'tagmanageIndex',
        component: () => import('@/views/Index'),
        meta: {title:'全部', icon: 'el-icon-s-data', requireAuth: false}
      },
      {
        path: 'add',
        name: 'tagmanageAdd',
        component: () => import('@/views/Index'),
        meta: {title:'新增', icon: 'el-icon-circle-plus', requireAuth: false}
      }
    ]
  },
  {
    path: '/commentmanage',
    component: Layout,
    meta: {
      title: '评论管理',
      icon: 'el-icon-chat-dot-square'
    },
    children: [
      {
        path: '',
        name: 'commentmanageIndex',
        component: () => import('@/views/Index'),
        meta: {title:'文章举报处理', icon: 'el-icon-s-data', requireAuth: false}
      },
      {
        path: 'add',
        name: 'commentmanageError',
        component: () => import('@/views/Index'),
        meta: {title:'新增', icon: 'el-icon-circle-plus', requireAuth: false}
      }
    ]
  },
  {
    path: '/reportmanage',
    component: Layout,
    meta: {
      title: '用户举报处理入口',
      icon: 'el-icon-position'
    },
    children: [
      {
        path: '',
        name: 'articlereportmanageIndex',
        component: () => import('@/views/Index'),
        meta: {title:'文章举报处理', icon: 'el-icon-s-data', requireAuth: false}
      },
      {
        path: 'reportmanageError',
        name: 'reportmanageIndex',
        component: () => import('@/views/Index'),
        meta: {title:'评论举报处理', icon: 'el-icon-s-data', requireAuth: false}
      }
    ]
  },
  {
    path: '/activitymanage',
    component: Layout,
    meta: {
      title: '活动管理',
      icon: 'el-icon-magic-stick'
    },
    children: [
      {
        path: '',
        name: 'activitymanageIndex',
        component: () => import('@/views/Index'),
        meta: {title:'全部', icon: 'el-icon-s-data', requireAuth: false}
      },
      {
        path: 'add',
        name: 'activitymanageAdd',
        component: () => import('@/views/Index'),
        meta: {title:'新增', icon: 'el-icon-circle-plus', requireAuth: false}
      }
    ]
  },
  {
    path: '/messagerecord',
    component: Layout,
    meta: {
      title: '消息系统记录',
      icon: 'el-icon-chat-line-round'
    },
    children: [
      {
        path: '',
        name: 'messagerecordIndex',
        component: () => import('@/views/Index'),
        meta: {title:'全部消息', icon: 'el-icon-s-data', requireAuth: false}
      },
      {
        path: 'add',
        name: 'messagerecordAdd',
        component: () => import('@/views/Index'),
        meta: {title:'异常用户', icon: 'el-icon-circle-plus', requireAuth: false}
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import('@/views/login/')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}