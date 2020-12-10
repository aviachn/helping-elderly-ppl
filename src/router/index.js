import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import CreateActivity from '../views/activities/CreateActivity.vue'
import ActivityDetails from '../views/activities/ActivityDetails.vue'

//route guard
import { projectAuth } from '../firebase/config'

const requireAuth =(to, from, next) => {
  let user = projectAuth.currentUser
  if(!user){
    next({ name:'Login' })
  }else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  }, {
    path: '/activities/createactivity',
    name: 'CreateActivity',
    component: CreateActivity,
    beforeEnter: requireAuth
  },
  {
    path: '/activities/:id',
    name: 'ActivityDetails',
    component: ActivityDetails,
    beforeEnter: requireAuth,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
