import Vue from 'vue'
import Router from 'vue-router'
import shoppingMall from '@/components/pages/shoppingMall'
import register from '@/components/pages/register'
import login from '@/components/pages/login'
import goods from '@/components/pages/goods'
import CategoryList from '@/components/pages/CategoryList'
import Cart from '@/components/pages/Cart'
import Main from '@/components/pages/Main'
import Member from '@/components/pages/Member'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', name: 'Main', component: Main, redirect: '/shoppingMall',
      children: [
        { path: '/shoppingMall', name: 'shoppingMall', component: shoppingMall },
        { path: '/CategoryList', name: 'CategoryList', component: CategoryList },
        { path: '/Cart', name: 'Cart', component: Cart },
        { path: '/Member', name: 'Member', component: Member },
      ]
    },
    { path: '/register', name: 'register', component: register },
    { path: '/login', name: 'login', component: login },
    { path: '/goods', name: 'goods', component: goods },

  ]
})
