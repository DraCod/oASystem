import Vue from 'vue'
import VueRouter from 'vue-router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import layout from '@/layout/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    //登录
    path: '/login',
    name: 'login',
    component: ()=>import('@/views/login/index.vue'),
  },
  {
    //给个人中心
    path:'/',
    component:layout,
    children:[
      {
        path:'person',
        component: ()=>import('@/views/person/index.vue')
      }
    ]
  },
  {
    //账号列表
    path:'/',
    component:layout,
    children:[
      {
        path:'account',
        component: ()=>import('@/views/account/index.vue')
      }
    ]
  },
  {
    //路由列表
    path:'/',
    component:layout,
    children:[
      {
        path:'router-list',
        component: ()=>import('@/views/router/index.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  nprogress.start();
  next();
})

router.afterEach(()=>{
  nprogress.done();
})

export default router
