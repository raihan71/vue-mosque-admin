import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path:'/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      requiresAuth: true
    },
    redirect: '/dashboard',
    children: [
      {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register.vue')
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        meta: {
          requiresAuth: true
        },
        component: () => import('../views/Dashboard.vue')
      },
      {
        path: '/donasi',
        name: 'Donasi',
        meta: {
          requiresAuth: true
        },
        component: () => import('../views/Donasi.vue')
      },
      {
        path: '/gallery',
        name: 'Gallery',
        meta: {
          requiresAuth: true
        },
        component: () => import('../views/Gallery.vue')
      },
      {
        path: '/info',
        name: 'Info',
        meta: {
          requiresAuth: true
        },
        component: () => import('../views/Info.vue')
      },
      {
        path: '/info/add',
        name: 'InfoAdd',
        meta: {
          requiresAuth: true
        },
        component: () => import('../views/AddInfo.vue')
      },
      {
        path: '/kajian',
        name: 'Kajian',
        meta: {
          requiresAuth: true
        },
        component: () => import('../views/Kajian.vue')
      },
      {
        path: '/kajian/add',
        name: 'KajianAdd',
        meta: {
          requiresAuth: true
        },
        component: () => import('../views/AddKajian.vue')
      },
      {
        path: '/takmir',
        name: 'Takmir',
        meta: {
          requiresAuth: true
        },
        component: () => import('../views/Takmir.vue')
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from , next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(
    record => record.meta.requiresAuth
  );
  
  if(requiresAuth && !currentUser) next('login');
   else if(!requiresAuth && currentUser) next('home');
    else next();
});

export default router
