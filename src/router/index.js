import Vue from 'vue'
import VueRouter from 'vue-router'
// import Store from '../store/index'
import Home from '../views/Home.vue'
// import Favourites from '../views/Favourites.vue'
import Account from '../views/Account.vue'
import SignIn from '../views/SignIn.vue'
import Password from '../views/Password.vue'
import SignUp from '../views/SignUp.vue'
import EmailConfirmation from '../views/EmailConfirmation.vue'
import Page404 from '../views/404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { authRequired: true }
  },
  {
    path: '/account',
    name: 'account',
    component: Account,
    meta: { authRequired: true }
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignIn
  },
  {
    path: '/password',
    name: 'password',
    component: Password
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/email-confirmation',
    name: 'email-confirmation',
    component: EmailConfirmation
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '*',
    component: Page404
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(route => route.meta.authRequired)) {
//     if (Store.getters.isUserAuthenticated)
//       next()
//     else
//       next('/signin')
//   }
// })

export default router
