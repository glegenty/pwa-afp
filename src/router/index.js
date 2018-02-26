import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Latest from '@/components/Latest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/latest',
      name: 'Latest',
      component: Latest
    }
  ]
})
