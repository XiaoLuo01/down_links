import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: () => import('./views/Recommend.vue')
    },
    {
      path: '/message',
      name: 'message',
      component: () => import('./views/Message.vue')
    },
    {
      path: '/appdetail',
      name: 'appdetail',
      component: () => import('./views/AppDetail.vue')
    }
  ]
})
