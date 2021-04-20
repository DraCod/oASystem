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
    path: '/login',
    name: 'login',
    component: ()=>import('@/views/login/index.vue'),
  },
  {
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
    path:'/',
    component:layout,
    children:[
      {
        path:'account',
        component: ()=>import('@/views/account/index.vue')
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
