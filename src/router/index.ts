import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/UserStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/library',
      name: 'library',
      component: () => import('../views/LibraryView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/users',
      name: 'users',
      meta: { requiresAuth: true, role: 'admin' },
      component: () => import('../views/UsersView.vue')
    },
    {
      path: '/donatebook',
      name: 'donatebook',
      meta: { requiresAuth: true },
      component: () => import('../views/DonateBookView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresAuth && to.meta.role && userStore.role !== to.meta.role) {
    next('/unauthorized')
  } else {
    next()
  }
})

export default router
