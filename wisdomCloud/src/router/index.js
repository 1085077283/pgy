import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: { path: '/Login' }
    },
    {
      path: '/Login',
      name: '登录',
      component: Login
    }
 
  ]
})
