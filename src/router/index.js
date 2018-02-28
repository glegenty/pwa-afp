import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Latest from '@/components/Latest'
import Article from '@/components/Article'
import Search from '@/components/Search'

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
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/article/:id',
      name: 'Article',
      component: Article
    }
  ]
})
