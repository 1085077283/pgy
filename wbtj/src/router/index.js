import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/Login'
import generalizeList from '@/views/generalizeList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: { path: '/login' }
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/generalizeList',
      name: 'generalizeList',
      component: generalizeList
    },

  ]
})
