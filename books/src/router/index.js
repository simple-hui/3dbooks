import Vue from 'vue'
import Router from 'vue-router'
import book from '@/components/book'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'book',
      component: book
    }
  ]
})
