import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Latest from '@/components/Latest'
import Article from '@/components/Article'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
    },
    {
      path: '/latest/:id',
      name: 'Article',
      component: Article
    }
  ]
})
