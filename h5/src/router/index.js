import Vue from 'vue'
import Router from 'vue-router'
import register from '@/components/register'
import guide from '@/components/guide'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: { path: '/register' }
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/guide',
      name: 'guide',
      component: guide
    },
  ]
})
