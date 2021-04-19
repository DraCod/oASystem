import Vue from 'vue'
import VueRouter from 'vue-router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: ()=>import('@/views/login/index.vue')
  },
  {
    path:'/home',
    name:'home',
    component: ()=>import('@/views/home/index.vue')
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
