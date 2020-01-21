import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import Favourites from '../views/Favourites.vue'
import Account from '../views/Account.vue'
import SignIn from '../views/SignIn.vue'
import Password from '../views/Password.vue'
import SignUp from '../views/SignUp.vue'
import EmailConfirmation from '../views/EmailConfirmation.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    // alias: '/index.html'
  },
  {
    path: '/account',
    name: 'account',
    component: Account
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
  // {
  //   path: '*',
  //   redirect: '/'
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
